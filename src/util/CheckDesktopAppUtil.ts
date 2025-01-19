import ConfigPathUtil from "./ConfigPathUtil";
import ConfigUtil from "./ConfigUtil";
import path from "path";
import fs from "fs";
import { EnvUtil } from "./EnvUtil";
import LMDRunningScriptEnv from "@/types/running/LMDRunningScriptEnv";
import RealVersionInfo from "@/types/running/RealVersionInfo";
import SystemCheckUtil from "./SystemCheckUtil";
import ReplaceUtil from "./ReplaceUtil";

const { exec } = require('child_process');
const os = require('os');

export default class CheckVersionUtil {

  static async checkVersionByName(appInstallName: string): Promise<RealVersionInfo> {
    // read env file from install folder
    // const configFilePath = ConfigPathUtil.getConfigFilePath()
    const config = ConfigUtil.getBaseConfig()
    const appScriptPath = path.join(config.LMD_SCRIPTS_DIR, 'lmd-install-scripts/apps', appInstallName)
    const appInstallEnvPath = path.join(appScriptPath, 'env')
    let envData: LMDRunningScriptEnv = {} as LMDRunningScriptEnv
    if(fs.existsSync(appScriptPath)) {
      try {
        envData = EnvUtil.getEnvFile(appInstallEnvPath) as unknown as LMDRunningScriptEnv
        ReplaceUtil.replaceVars(envData, '${LMD_APPS_DIR}', config.LMD_APPS_DIR);
      } catch (err) {
        console.error('read app env error ', err)
      }
    }
    let version = '--'
    let realVersionInfo
    let appInstallPath
    let appFullPath
    if(SystemCheckUtil.isMacOS()) {
      appInstallPath = envData._MAC_INSTALL_PATH
      if (envData._MAC_INSTALL_FILE_NAME) {
        appFullPath = path.join(appInstallPath, envData._MAC_INSTALL_FILE_NAME)
      }
      if (envData._VERSION_DETECTABLE !== '0' && appFullPath) {
        try {
          version = await this.checkVersion(appFullPath)
        } catch(err) {
          console.error(err)
        }
      }
      realVersionInfo = {
        version,
        appInstallPath,
        appFullPath
      } as RealVersionInfo
    }
    // TODO: windows and linux
    return realVersionInfo
  }

  static async checkVersion(appFullFilePath: string): Promise<string> {
    let appPath = appFullFilePath;
    let version;
    // 检查应用是否存在
    const fs = require('fs');
    if (!fs.existsSync(appPath)) {
        console.error(`错误: 应用程序 ${appPath} 不存在.`);
    }

    // if (os.platform() === 'darwin') { // macOS
    //     // appPath = '/Applications/Safari.app';
    //     appPath = '/Applications/Ollama.app';
    // } else if (os.platform() === 'win32') { // Windows
    //     appPath = 'C:\\Program Files\\YourApp'; // 替换为你的Windows应用路径
    // } else { // Linux
    //     appPath = '/usr/bin/yourapp'; // 替换为你的Linux应用路径
    // }

    const platform = os.platform();
    return new Promise((resolve, reject) => {
      if (platform === 'darwin') {
        // macOS: 使用 defaults 或 mdls 获取版本信息
        const defaultsCommand = `defaults read "${appPath}/Contents/Info" CFBundleShortVersionString`;
        exec(defaultsCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Check Ver Error: ${stderr}`);
              // 如果 defaults 失败，则尝试使用 mdls
              const mdlsCommand = `mdls -raw -name kMDItemVersion "${appPath}"`;
              exec(mdlsCommand, (mdlsError, mdlsStdout, mdlsStderr) => {
                if (mdlsError) {
                  reject(`Check Ver Error ${appPath} ${mdlsStderr}`);
                } else if (mdlsStdout.trim()) {
                  version = mdlsStdout.trim()
                  resolve(version)
                } else {
                  reject(`Check Ver Error ${appPath}`);
                }
              });
            } else if (stdout.trim()) {
              version = stdout.trim()
              resolve(stdout.trim());
              console.log(`version: ${version}`);
            } else {
                console.error(`Check Ver Error ${appPath}`);
            }
        });
    } else if (platform === 'win32') {
        // Windows: 使用 PowerShell 查询版本信息
        const powershellCommand = `Get-ItemProperty -Path Registry::"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*" | Where-Object {$_.DisplayName -like "*YourAppName*"} | Select-Object DisplayName, DisplayVersion`;
        exec(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${powershellCommand}"`, (error, stdout, stderr) => {
          if (error) {
            reject(`Check Ver Error: ${stderr} ${error}`);
            return;
          }
          if (stdout.trim()) {
            resolve(stdout.trim());
          } else {
            console.error('Check Ver Error');
          }
        });
    } else {
      // Linux: 假设应用程序提供了 --version 参数
      exec(`${appPath} --version`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Check Ver Error: ${stderr}`);
          return;
        }
        if (stdout.trim()) {
          resolve(stdout.trim());
        } else {
          reject(`Check Ver Error ${appPath} `);
        }
      });
    }
    })
  }

}
