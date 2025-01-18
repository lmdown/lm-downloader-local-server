import FileStorageInfo from "../model/FileStorageInfo";

export default class FileStorageInfoService {

  public async getStorageInfoByInstanceId(installedInstanceId: string | number): Promise<FileStorageInfo[]> {
    const records = await FileStorageInfo.findAll({
      raw: true,
      where: {
        installedInstanceId
      }
    });
    return records
  }

}
