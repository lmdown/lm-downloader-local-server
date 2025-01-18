export default class ReplaceUtil {

  static replaceVars(config: {}, rootVariable: string, rootValue: string) {
    for(let tempKey in config) {
      if(tempKey !== 'LMD_DATA_ROOT') {
        // console.log('tempkey',tempKey, rootVariable, config[tempKey])
        config[tempKey] = config[tempKey].replace(rootVariable, rootValue)
      }
    }
  }

}
