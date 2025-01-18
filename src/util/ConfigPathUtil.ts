import * as path from 'path';
import fs from 'fs';
import LMDBaseConfig from "../types/running/LMDBaseConfig";
import { DEFAULT_LMD_BASE_CONFIG } from "../template/base_config_template";

export default class ConfigPathUtil {

  static CONFIG_FILE_NAME: string = 'lmd_base_config.env';

  static GLOBAL_ENV_FILE_NAME: string = 'lmd_global_variables.env';

  static getRootDir() {
    const USER_HOME = process.env.HOME || process.env.USERPROFILE
    const userDocumentsPath = path.join(USER_HOME, 'Documents');
    if(!fs.existsSync(userDocumentsPath)) {
      throw new Error('Can\'t find Documents Dir in ' + USER_HOME)
    }
    const tempConfig: LMDBaseConfig = DEFAULT_LMD_BASE_CONFIG;
    const rootDir = tempConfig.LMD_DATA_ROOT.replace('${documents}', userDocumentsPath)
    return {rootDir, tempConfig}
  }

  static getConfigFilePath() {
    const {rootDir} = ConfigPathUtil.getRootDir()
    const configFilePath = path.join(rootDir, this.CONFIG_FILE_NAME);
    return configFilePath
  }


  static getGlobalEnvFilePath() {
    const {rootDir} = ConfigPathUtil.getRootDir()
    return path.join(rootDir, this.GLOBAL_ENV_FILE_NAME);
  }

}
