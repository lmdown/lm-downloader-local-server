import FileInfoUtil from "./FileInfoUtil"
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import LocalDirectoryInfo from '../types/running/app-running/LocalDirectoryInfo'
import LocalDiskInfo from "@/types/running/app-running/LocalDiskInfo"

export default class DirInfoUtil{

  static getDirInfo(targetDir): LocalDirectoryInfo | null {
    if (!fs.existsSync(targetDir)) {
      console.error('dir dose not exist', targetDir)
      return null
    }
    const dirStat = fs.statSync(targetDir)
    if (!dirStat.isDirectory()) {
      console.error('not a dir ', targetDir)
      return null
    }

    const dirSize = FileInfoUtil.getDirSize(targetDir)
    // const formatBytes = (bytes) => {
    //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    //   if (bytes === 0) return '0 Byte'
    //   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    //   return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i]
    // }
    // const dirSizeFormatted = formatBytes(dirSize)

    const diskInfo = this.getDiskInfo(targetDir, dirStat)

    // console.log(`目录 ${targetDir} 存储在硬盘: ${diskInfo.diskName}`)
    // console.log(`目录 ${targetDir} 的大小: ${dirSizeFormatted}`)
    // console.log(`硬盘 ${diskInfo.diskName} 的总大小: ${diskInfo.totalSpace}`)
    // console.log(`硬盘 ${diskInfo.diskName} 的剩余空间: ${diskInfo.freeSpace}`)
    const dirInfo: LocalDirectoryInfo = {} as LocalDirectoryInfo
    dirInfo.dirPath = targetDir
    dirInfo.diskName = diskInfo.diskName
    dirInfo.dirSize = dirSize
    dirInfo.freeSpace = diskInfo.freeSpace
    dirInfo.totalSpace = diskInfo.totalSpace
    return dirInfo
  }


  static getDiskName(dirStat) {
    const deviceId = dirStat.dev
    // console.log('deviceId', deviceId)

    const dfOutput = execSync('df -k').toString()
    const lines = dfOutput.split('\n')
    // console.log('dfOutput:', dfOutput)
    for (let i = 1; i < lines.length; i++) {
      // console.log('i --- ', i)
      const line = lines[i].trim()
      // console.log('line --- ', line)
      if (line) {
        const parts = line.split(/\s+/)
        const devicePath = parts[0]
        const mountPoint = parts[8]
        // console.log('devicePath --- ', devicePath)
        // console.log('mountPoint --- ', mountPoint)
        try {
          const mountStats = fs.statSync(mountPoint)
          // console.log('mountStats --- ', mountStats)
          if (mountStats.dev === deviceId) {
            const cmd = `diskutil info "${devicePath}" | grep "Volume Name" | awk -F': ' '{print $2}'`
            console.log(cmd)
            const diskName = execSync(cmd).toString().trim()
            console.log('diskName', diskName)
            return diskName
          }
        } catch (error) {
          console.error(`Error getting stats for ${mountPoint}:`, error.message)
        }
      }
    }
  }

  static getDiskInfo(targetDir, dirStat): LocalDiskInfo {
    let platform = process.platform
    let diskInfo = {} as LocalDiskInfo

    if (platform === 'darwin') {
      // Mac
      try {
        // 获取挂载点
        const volumeNameMatch = this.getDiskName(dirStat)
        const volumeName = volumeNameMatch ? volumeNameMatch.trim() : 'Disk'
        // console.log('volumeName', volumeName)
        const dfHumanOutput = execSync(`df -k "${targetDir}"`).toString()
        const humanLines = dfHumanOutput.split('\n')
        const humanDiskLine = humanLines[1]
        const humanParts = humanDiskLine.trim().split(/\s+/)
        const totalSpace = Number(humanParts[1]) * 1024
        const freeSpace = Number(humanParts[3]) * 1024

        diskInfo = {
          diskName: volumeName,
          totalSpace,
          freeSpace
        }
      } catch (error) {
        console.error('check disn info error:', error.message)
      }
    } else if (platform === 'win32') {
      // Windows
      try {
        const driveLetter = path.parse(targetDir).root
        const wmicOutput = execSync(
          `wmic logicaldisk where "DeviceID='${driveLetter.replace('\\', '')}'" get Size,FreeSpace /value`
        ).toString()
        const lines = wmicOutput.split('\n').filter((line) => line.trim() !== '')
        const sizeLine = lines.find((line) => line.startsWith('Size='))
        const freeSpaceLine = lines.find((line) => line.startsWith('FreeSpace='))

        const totalSpaceBytes = parseInt(sizeLine.split('=')[1], 10)
        const freeSpaceBytes = parseInt(freeSpaceLine.split('=')[1], 10)

        // const formatBytes = (bytes) => {
        //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        //   if (bytes === 0) return '0 Byte'
        //   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        //   return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i]
        // }

        diskInfo = {
          diskName: driveLetter,
          totalSpace: totalSpaceBytes,
          freeSpace: freeSpaceBytes
        }
      } catch (error) {
        console.error('check disk info err:', error.message)
      }
    } else {
      console.error('dose not support this OS')
    }

    return diskInfo
  }

}



// getDirInfo('/Users/lukia/Documents/LeeDoc/tools/g')
