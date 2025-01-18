import LMDBaseConfig from "@/types/running/LMDBaseConfig"
import ConfigPathUtil from "./ConfigPathUtil"
import { EnvUtil } from "./EnvUtil"
import LMDGlobalEnv from "@/types/running/LMDGlobalEnv"

export default class ConfigUtil {
  static getBaseConfig(): LMDBaseConfig {
    const configFilePath = ConfigPathUtil.getConfigFilePath()
    const config = EnvUtil.getEnvFile(configFilePath) as unknown as LMDBaseConfig
    return config
  }

  static getGlobalEnv(): LMDGlobalEnv {
    const envFilePath = ConfigPathUtil.getGlobalEnvFilePath()
    return EnvUtil.getEnvFile(envFilePath) as unknown as LMDGlobalEnv
  }

}
