import InstalledModel from "@/types/running/app-running/InstalledModel";

const { execSync } = require('child_process');

export default class AppModelsUtil {


  static getAllModels(appInstallName: string): InstalledModel[] {
    if(appInstallName === 'ollama') {
      return this.getOllamaAllModels()
    }
    return []
  }

  static getOllamaAllModels() {
    const command = `ollama list`
    let output = ''
    try {
      const stdout = execSync(command);
      console.log('got model list: ', stdout.toString())
      output = stdout.toString()
      // console.log( stdout.toString())
    } catch (error) {
      console.error('run ollama list error', error);
      return []
    }

    // 将输出按行分割
    const lines = output.split('\n');

    // 初始化数组用于存放解析后的数据
    const dataArray: { name: string; size: string }[] = [];

    /**
     * 查找指定列名的位置，并返回其起始和结束位置。
     * @param headerLine 标题行字符串
     * @param columnName 要查找的列名
     */
    const findColumnPosition = (headerLine: string, columnName: string): { start: number; end: number } => {
        const index = headerLine.indexOf(columnName);
        if (index === -1) {
            throw new Error(`Column '${columnName}' not found in header.`);
        }
        // 找到该列的结束位置，即下一个非空白字符的位置或行尾
        let end = headerLine.length;
        for (let i = index + columnName.length; i < headerLine.length; i++) {
            if (headerLine[i] !== ' ') {
                end = i;
                break;
            }
        }
        return { start: index, end: end };
    }

    // 获取标题行
    const headerLine = lines[0];

    // 动态计算 NAME 和 SIZE 列的位置
    const nameColumnPosition = findColumnPosition(headerLine, 'NAME');
    const sizeColumnPosition = findColumnPosition(headerLine, 'SIZE');

    // 跳过第一行（标题行），并处理每一行数据
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // 提取 NAME 列的数据
        const nameValue = line.substring(nameColumnPosition.start, nameColumnPosition.end).trim();

        // 提取 SIZE 列的数据
        const sizeValue = line.substring(sizeColumnPosition.start, sizeColumnPosition.end).trim();

        // 将每条记录作为一个对象存入数组
        if(nameValue) {
          dataArray.push({ name: nameValue, size: sizeValue });
        }
    }


    return dataArray
  }

}
