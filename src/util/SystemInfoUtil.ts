import os from 'os'
import SystemCheckUtil from './SystemCheckUtil';
import { execSync } from 'child_process';
import SystemCommandUtil from './SystemCommandUtil';

export default class SystemInfoUtil {

  static getIPv4Addresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (const interfaceName in interfaces) {
      const iface = interfaces[interfaceName];
      for (const alias of iface) {
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1') {
          addresses.push(alias.address);
        }
      }
    }
    return addresses;
  }

  static getSingleLanIP() {
    const ipv4Addresses = this.getIPv4Addresses();
    let resultIP = ''
    console.log("IP Addresses:", ipv4Addresses);
    if(ipv4Addresses && ipv4Addresses.length > 0) {
      resultIP = ipv4Addresses[0]
    }
    return resultIP
  }

  static getOSEnv(key: string) {
    let command = ''
    if(SystemCheckUtil.isMacOS()) {
      command = `launchctl getenv ${key}`
    } else if(SystemCheckUtil.isWindows()) {
      return process.env[key]
    }
    if(command) {
      return SystemCommandUtil.runCommand(command)
    }
  }

  static setOSEnv(key: string, value: string) {
    let command = ''
    if(value === '') {
      value = '\"\"'
    }
    if(SystemCheckUtil.isMacOS()) {
      command = `launchctl setenv ${key} ${value}`
    } else if(SystemCheckUtil.isWindows()) {
      command = `setx ${key} ${value}`
    }
    console.log('setOSEnv command', command)
    if(command) {
      try {
        const stdout = execSync(command);
        const result = stdout.toString()
        console.log('set env', key, result)
        process.env[key] = value
        return result
      } catch (error) {
      console.error('setOSEnv err', error);
        throw error
      }
    }
  }

}

