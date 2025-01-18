import os from 'os';

export default class SystemCheckUtil {

  static isMacOS() {
    const platform = os.platform();
    return platform === 'darwin'
  }

}
