import fs from 'fs'
import path from 'path';

export default class FileInfoUtil {

  static getDirSize(dirPath: string): number {
    let totalSize = 0;
    if (!fs.existsSync(dirPath)) {
      console.error('dir dose not exist.', dirPath)
      return totalSize
    }
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
