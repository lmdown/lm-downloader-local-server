import LMDEnv from './LMDEnv'

export default interface LMDBaseConfig extends LMDEnv {
  // 配置，数据，AI应用，模型等所有文件的根目录
  LMD_DATA_ROOT: string
  // 环境初始化的目录
  LMD_ENV_INIT_DIR: string
  // 应用安装和管理脚本的目录
  LMD_SCRIPTS_DIR: string
  // 应用安装的目录
  LMD_APPS_DIR: string

  LMD_LOCALE: string

}
