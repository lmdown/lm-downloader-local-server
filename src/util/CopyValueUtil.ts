export default class CopyValueUtil {

  static copySomeEnvVars():Object {
    const envVars = [
      'ALLUSERSPROFILE',
      'APPDATA',
      'CommonProgramFiles',
      'CommonProgramFiles(x86)',
      'CommonProgramW6432',
      'COMMON_RATE_LIMIT_MAX_REQUESTS',
      'COMMON_RATE_LIMIT_WINDOW_MS',
      'COMPUTERNAME',
      'ComSpec',
      'HOME',
      'HOMEDRIVE',
      'HOMEPATH',
      'HOST',
      'NUMBER_OF_PROCESSORS',
      'OneDrive',
      'ORIGINAL_XDG_CURRENT_DESKTOP',
      'OS',
      'Path',
      'PROCESSOR_ARCHITECTURE',
      'PROCESSOR_IDENTIFIER',
      'PROCESSOR_LEVEL',
      'PROCESSOR_REVISION',
      'ProgramData',
      'ProgramFiles',
      'ProgramFiles(x86)',
      'ProgramW6432',
      'PROMPT',
      'PSModulePath',
      'PUBLIC',
      'SESSIONNAME',
      'SystemDrive',
      'SystemRoot',
      'TEMP',
      'TERM_PROGRAM',
      'TERM_PROGRAM_VERSION',
      'TMP',
      'USERDOMAIN',
      'USERDOMAIN_ROAMINGPROFILE',
      'USERNAME',
      'USERPROFILE',
      'windir',
    ]
    return this.copySpecificKeys(process.env, envVars)
  }

  static copySpecificKeys(source: Object, keysToCopy: string[]): Object {
    let target = {}; // 创建一个新的对象用于存储复制的数据
    keysToCopy.forEach(key => {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key]; // 只有当源对象包含指定键时才进行复制
        }
    });
    return target;
  }
}

