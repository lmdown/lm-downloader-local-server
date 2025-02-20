import InstalledInstance from "../model/InstalledInstance";
import { FileStorageInfoDTO, InstalledInstanceDTO } from "@/types/InstalledInstanceDTO";
import FileStorageInfoService from "./FileStorageInfoService";
import { app } from "@/server";
import { AIAppDTO } from "@/types/AIAppDTO";
import AIAppInfoService from "@/app-store/service/aiAppInfoService";
import CheckVersionUtil from "@/util/CheckDesktopAppUtil";
import RealVersionInfo from "@/types/running/RealVersionInfo";

export default class InstalledInstanceService {

  fileStorageSrv = new FileStorageInfoService()
  appInfoSvr = new AIAppInfoService()

  async getInstalledInstanceList() {
    const instances = await InstalledInstance.findAll({
      order: [
        ['update_time', 'DESC'],
        ['id', 'DESC']
      ],
      raw: true, where: {},
      attributes: { exclude: ['create_time', 'update_time'] }
    });
    const installedInstanceDTOList: InstalledInstanceDTO[] = [];
    for (let item of instances) {
      const dto = Object.assign({} as InstalledInstanceDTO, item)
      const appIcon = await this.appInfoSvr.getAIAppIcon(String(item.appId))
      dto.appIcon = appIcon
      const fileStorageInfoDTOList = await this.getStorageInfoByInstanceId(item.id)
      dto.fileStorageInfoList = fileStorageInfoDTOList
      await this.fillRealVersion(dto, item)

      installedInstanceDTOList.push(dto)
    }
    return installedInstanceDTOList;
  }

  /**
   * 获取某个应用安装的实例
   * @param appId 应用ID
   * @returns
   */
  async getInstalledInstanceForApp(appId: string) {
    const instances = await InstalledInstance.findAll({
      raw: true, where: {appId},
      attributes: { exclude: ['create_time', 'update_time'] }
    });
    const installedInstanceDTOList: InstalledInstanceDTO[] = [];
    for (let item of instances) {
      const dto = Object.assign({} as InstalledInstanceDTO, item)
      const fileStorageInfoDTOList = await this.getStorageInfoByInstanceId(item.id)
      dto.fileStorageInfoList = fileStorageInfoDTOList
      installedInstanceDTOList.push(dto)
      // console.log('dto:::::', dto)
      try {
        await this.fillRealVersion(dto, item)
      } catch (err) {
        console.error(err)
        dto.version = '--'
      }
      // console.log('dto:::::', dto)
      // console.log('dto ver', dto.version)
    }
    // console.log('installedInstanceDTOList:::::', installedInstanceDTOList)
    //this.getInstalledInstance();
    return installedInstanceDTOList;
  }

  // async getInstalledInstance(installedInstanceId: string | number) {
  //   const record = await InstalledInstance.findOne({ raw: true, where: {installedInstanceId} });
  //   let dto: installedInstanceDTO = {} as installedInstanceDTO
  //   dto = Object.assign(dto, record)
  //   const fileStorageInfoDTOList = await this.getStorageInfoByInstanceId()
  //   dto.fileStorageInfoList = fileStorageInfoDTOList
  //   return dto;
  // }

  async getStorageInfoByInstanceId(installedInstanceId: string | number) {
    const sList = await this.fileStorageSrv.getStorageInfoByInstanceId(installedInstanceId)
    const fileStorageInfoDTOList: FileStorageInfoDTO[] = sList.map(storageInfo => {
      // const fileStorageInfoDTO = {} as FileStorageInfoDTO;
      const fileStorageInfoDTO: FileStorageInfoDTO = Object.assign({} as FileStorageInfoDTO, storageInfo)
      return fileStorageInfoDTO
    })
    return fileStorageInfoDTOList;
  }

  async getInstalledInstance(id: string) {
    const query = {
      // 安装实例ID
      id: id
    }
    const record = await InstalledInstance.findOne({ raw: true, where: query });
    let dto = {} as InstalledInstanceDTO
    dto = Object.assign(dto, record)
    const sList = await this.fileStorageSrv.getStorageInfoByInstanceId(id)
    const fileStorageInfoDTOList: FileStorageInfoDTO[] = sList.map(storageInfo => {
      // const fileStorageInfoDTO = {} as FileStorageInfoDTO;
      const fileStorageInfoDTO: FileStorageInfoDTO = Object.assign({} as FileStorageInfoDTO, storageInfo)
      return fileStorageInfoDTO
    })
    dto.fileStorageInfoList = fileStorageInfoDTOList
    await this.fillRealVersion(dto, record)
    // dto.version = await CheckVersionUtil.checkVersionByName(record.installName)
    return dto;
  }

  async fillRealVersion(dto: InstalledInstanceDTO, instance: InstalledInstance): Promise<string> {
    const realVersionInfo =
      await CheckVersionUtil.checkVersionByName(instance.installName, instance.appId) || {} as RealVersionInfo
    dto.version = realVersionInfo.version
    dto.appFullPath = realVersionInfo.appFullPath
    dto.appInstallPath = realVersionInfo.appInstallPath
    return realVersionInfo.version
  }

  async createInstanceByApp(app: AIAppDTO, installType: string = 'default') {
    const installInstance = {} as InstalledInstance
    installInstance.appId = Number(app.id)
    installInstance.name = app.name
    installInstance.version = app.currentVersion
    installInstance.installMethod = installType
    installInstance.installName = app.installName
    return await InstalledInstance.create(installInstance as any)
  }

}
