// 启动时用默认模板，生成配置文件，存到LMD_DATA_ROOT下面
// 如果用户修改了根目录，此配置变更，其他文件会保存到新的根目录下。

import LMDBaseConfig from "../types/running/LMDBaseConfig"

// 文件名为：lmd_base_config.json
export const DEFAULT_LMD_BASE_CONFIG: LMDBaseConfig = {
  // 配置，数据，AI应用，模型等所有文件的根目录
  LMD_DATA_ROOT: "${documents}/lmd_data_root",
  // 环境初始化的目录
  LMD_ENV_INIT_DIR: "${LMD_DATA_ROOT}/env-init",
  // 应用安装和管理脚本的目录
  LMD_SCRIPTS_DIR: "${LMD_DATA_ROOT}/scripts",
  // 应用安装的目录
  LMD_APPS_DIR: "${LMD_DATA_ROOT}/apps",

  LMD_LOCALE: "",
}

