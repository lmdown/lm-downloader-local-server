import * as path from 'path';
import fs from 'fs';
import LMDBaseConfig from "../types/running/LMDBaseConfig";
import { DEFAULT_LMD_BASE_CONFIG } from "../template/base_config_template";

export default class ConfigPathUtil {

  static CONFIG_FILE_NAME: string = 'lmd_base_config.env';

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


}
