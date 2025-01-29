import ConfigUtil from "./ConfigUtil";
import SystemCheckUtil from "./SystemCheckUtil";
import path from 'path'

export default class ShellExecUtil {

  static getExecPath() {
    if(SystemCheckUtil.isWindows()) {
      // Windows use PortableGit/bin/bash.exe
      const baseConfig = ConfigUtil.getBaseConfig()
      const bashPath = path.join(baseConfig.GIT_INSTALL_PATH, 'bin/bash.exe')
      return bashPath
    } else {
      // macOS and Linux both use bash
      return 'bash'
    }
  }

}
