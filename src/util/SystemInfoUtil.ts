import os from 'os'
import SystemCheckUtil from './SystemCheckUtil';
import { execSync } from 'child_process';

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
      try {
        const stdout = execSync(command);
        let result = stdout.toString()
        if(result) {
          result = result.trim()
        }
        console.log('got env', key, result)
        return result
      } catch (error) {
        console.error('getOSEnv err', error);
        return ''
      }
    }
  }

  static setOSEnv(key: string, value: string) {
    let command = ''
    if(SystemCheckUtil.isMacOS()) {
      if(value === '') {
        value = '\"\"'
      }
      command = `launchctl setenv ${key} ${value}`
      console.log('command', command)
      try {
        const stdout = execSync(command);
        const result = stdout.toString()
        console.log('set env', key, result)
        return result
      } catch (error) {
        console.error('setOSEnv err', error);
        throw error
      }
    }
  }

}

