const fs = require('fs');
const path = require('path');

export default class FileInfoUtil {

  static getDirSize(dirPath: string): number {
    let totalSize = 0;

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += this.getDirSize(filePath); // 递归调用以处理子目录
      } else {
        totalSize += stats.size;
      }
    });

    return totalSize;
  }

}
