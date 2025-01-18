import {resolve, join} from 'path'
import ConfigUtil from './ConfigUtil'

export default class PathUtil {

  static getDBFilePath(fileName: string, dbDir: string) {
    const baseConfig = ConfigUtil.getBaseConfig()
    const lmdDataRoot = baseConfig.LMD_DATA_ROOT || process.cwd()
    if(dbDir.includes('${LMD_DATA_ROOT}')) {
      dbDir = dbDir.replace('${LMD_DATA_ROOT}', lmdDataRoot)
    }
    let dbFilePath = join(dbDir, fileName)
    dbFilePath = resolve(dbFilePath)
    return dbFilePath
  }

  static getAppStoreDBPath(fileName: string) {
    const dbDir = process.env.APP_STORE_DB_DIR || './db'
    return this.getDBFilePath(fileName, dbDir)
  }

  static getSelfManageDBPath(fileName: string) {
    const dbDir = process.env.SELF_MANAGE_DB_DIR || './db'
    return this.getDBFilePath(fileName, dbDir)
  }


}
