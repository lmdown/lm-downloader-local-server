import LMDBaseConfig from "@/types/running/LMDBaseConfig"
import ConfigPathUtil from "./ConfigPathUtil"
import { EnvUtil } from "./EnvUtil"

export default class ConfigUtil {
  static getBaseConfig(): LMDBaseConfig {
    const configFilePath = ConfigPathUtil.getConfigFilePath()
    const config = EnvUtil.getEnvFile(configFilePath) as unknown as LMDBaseConfig
    return config
  }
}
