import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import { IPty } from 'node-pty';
import { Express } from "express-serve-static-core";
import ConfigUtil from '@/util/ConfigUtil';
import ShellExecUtil from '@/util/ShellExecUtil';
import SystemCheckUtil from '@/util/SystemCheckUtil';
import CopyValueUtil from '@/util/CopyValueUtil';
const pty = require('node-pty');

const os = require('os')
// const pty = require('node-pty');

const shell = ShellExecUtil.getExecPath()

class WSServer {
  private wss: WebSocketServer
  private expressApp: Express
  // private terminals: Map<number, any> = new Map()

  constructor(app: Express, server: http.Server) {
    this.wss = new WebSocketServer({ server })
    this.expressApp = app
    this.setupEventHandlers()
  }

  getFullEnvForApp() {
    const processEnv = process.env
    let fullEnv = {}

    if(SystemCheckUtil.isWindows()) {
      fullEnv =  CopyValueUtil.copySomeEnvVarsWindows()
    } else {
      fullEnv = {
        HOME: processEnv.HOME
      }
    }
    fullEnv = Object.assign(fullEnv, CopyValueUtil.copyOllamaEnvVars())

    const baseConfig = ConfigUtil.getBaseConfig()
    const globalEnv = ConfigUtil.getGlobalEnv()
    fullEnv = Object.assign(fullEnv, baseConfig)
    fullEnv = Object.assign(fullEnv, globalEnv)
    return fullEnv
  }

  setupEventHandlers() {
    this.wss.on('connection', (ws) => {
        // console.log('socket connection success');
        const fullEnv = this.getFullEnvForApp()

        const ptyProcess: IPty = pty.spawn(shell, [], {
          name: 'lmd-xterm',
          cols: 80,
          rows: 30,
          cwd: process.env.HOME,
          env: fullEnv
        });

        // console.log('Created terminal with PID: ' + ptyProcess.pid)

        //接受数据
        ws.on('message', (res) => {
          const decoder = new TextDecoder('utf-8');
          // @ts-ignore
          const text = decoder.decode(res);
          // console.log('text ---- ', text)
          if(typeof text === 'string') {
            const clientMsg: string = text
            if(clientMsg.startsWith('lmd_action:resize:')) {
              const colsAndRowsStr = clientMsg.replace('lmd_action:resize:', '')
              const colsAndRowsArr = colsAndRowsStr.split(',')
              const cols = parseInt(colsAndRowsArr[0])
              const rows = parseInt(colsAndRowsArr[1])
              console.log('resize terminal ', cols, rows)
              ptyProcess.resize(cols, rows)
              return
            }
          }
          // @ts-ignore
          ptyProcess.write(res)
        });

        ws.on('error', (err: Error) => {
          console.log('ws got error ', err)
        })
        ws.on('close', (ws: WebSocket, code: number, reason: Buffer) => {
          console.log('ws close ', code, reason)
          ptyProcess.kill()
        })

        // @ts-ignore
        ptyProcess.on('data', (data) => {
          // console.log('got data ', data)
          process.stdout.write(data);
          this.sendToWSClient(ws, data, ptyProcess)
        });

        // ptyProcess.stderr.on('data', (data) => {
        //   console.error(`stderr: ${data}`);
        // });

        // @ts-ignore
        ptyProcess.on('close', (code: number, reason: Buffer) => {
          console.log('ws got close 子进程退出', code, reason)
        })

        // this.sendToWSClient(ws, 'terminal_pid:'+ptyProcess.pid, ptyProcess)
    });
  }

  sendToWSClient(ws:WebSocket, data: any, ptyProcess: IPty) {
    try {
      ws.send(data)
    } catch (error) {
      console.log('向客户端发送失败', error)
      //关掉当前进程
      ptyProcess.kill()
    }
  }

  private broadcast(message: string) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }

  public start() {
    console.log('WebSocket server is running');
  }
}

export default WSServer;
