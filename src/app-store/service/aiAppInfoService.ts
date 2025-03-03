import { Request, Response } from 'express';
import AIApp from '../model/AIApp';
import AIAppVersion from '@/app-store/model/AIAppVersion';
import AIAppDesc from '@/app-store/model/AIAppDesc';
import { AppDownload, AIAppDTO, InstallLimit, AccessInfo } from '@/types/AIAppDTO';
import { CommonQuery } from '@/types/CommonQuery';

export default class AIAppInfoService {

  async getPageList(req: Request) {
    const query: CommonQuery = req.query
    const locale = query.locale as string;
    const appQuery = this.buildAppQuery(query)

    const page = query.page || 1
    const limit = query.limit || 10
    const offset = (page - 1) * limit;
    const { count, rows } = await AIApp.findAndCountAll({
      limit,
      offset,
      order: [
        ['update_time', 'DESC'],
        ['id', 'DESC']
      ],
      raw: true,
      where: appQuery
    });
    let resultAppInfoList: AIAppDTO[];
    // 把相关的存储信息，版本信息，描述信息也查出来
    const resultAppIds = rows.map(aiApp => {
      return aiApp.id
    })
    let baseQuery = {};
    if (locale) {
      baseQuery = { locale: locale };
    }
    const queryWithAppId = Object.assign({appId: resultAppIds}, baseQuery);

    const aiAppDescRecords = await AIAppDesc.findAll({
      raw: true,
      where: queryWithAppId
    })
    resultAppInfoList = rows.map((aiApp): AIAppDTO => {
      const appId = aiApp.id
      const descItem = aiAppDescRecords.find(desc=>desc.appId===appId)
      let aiAppDTO: AIAppDTO = {} as AIAppDTO
      const downloadInfo = aiApp.downloadInfo
      aiApp.downloadInfo = undefined
      aiAppDTO = Object.assign(aiAppDTO, aiApp)

      this.fillDescData(aiAppDTO, descItem)
      if(aiApp.installLimit) {
        this.fillInstallLimit(aiAppDTO, aiApp)
      }

      if(downloadInfo) {
        aiAppDTO.downloadInfo = JSON.parse(downloadInfo) as AppDownload
      }
      if(aiApp.tags) {
        aiAppDTO.tags = aiApp.tags.split(',')
      }
      return aiAppDTO;
    })

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: resultAppInfoList,
    }
  }

  buildAppQuery(query: CommonQuery) {
    const appQuery: {id?: string[]} = {}
    if(query.ids) {
      const appIds = query.ids as string;
      const idArr = appIds.split(',')
      appQuery.id = idArr // 向id传数组，可以实现sql in的效果
    }
    return appQuery
  }

  fillDownloadInfo(aiApp: AIAppDTO) {
    try {
      if(aiApp.downloadInfo && typeof aiApp.downloadInfo === 'string') {
        aiApp.downloadInfo = JSON.parse(aiApp.downloadInfo)
      }
    } catch (err) {
      console.error(err)
    }
  }

  fillLicenseInfo(aiApp: AIAppDTO) {
    try {
      if(aiApp.licenseInfo && typeof aiApp.licenseInfo === 'string') {
        aiApp.licenseInfo = JSON.parse(aiApp.licenseInfo)
      }
    } catch (err) {
      console.error(err)
    }
  }

  fillRefLinks(aiApp: AIAppDTO) {
    try {
      if(aiApp.refLinks && typeof aiApp.refLinks === 'string') {
        aiApp.refLinks = JSON.parse(aiApp.refLinks)
      }
    } catch (err) {
      console.error(err)
    }
  }


  fillSnapshots(aiApp: AIAppDTO) {
    try {
      if(aiApp.snapshots && typeof aiApp.snapshots === 'string') {
        aiApp.snapshots = (aiApp.snapshots as string).split(',')
      }
    } catch (err) {
      console.error(err)
    }
  }

  fillDescData(aiAppDTO: AIAppDTO, descItem: AIAppDesc | undefined | null) {
    if(descItem) {
      aiAppDTO.name = descItem.name;
      if(descItem.desc) {
        aiAppDTO.desc = descItem.desc;
      }
      if(descItem.shortDesc) {
        aiAppDTO.shortDesc = descItem.shortDesc;
      }
    }
  }

  fillInstallLimit(aiAppDTO: AIAppDTO, aiApp: AIApp) {
    //const installLimitStr: string | undefined | null
    if(!aiApp) {
      return;
    }
    const installLimitStr: string | undefined | null = aiApp.installLimit
    if(installLimitStr) {
      const installLimit: InstallLimit = JSON.parse(installLimitStr)
      aiAppDTO.installLimit = installLimit
    }
    //console.log('aiAppDTO.installLimit ---- ---- ', aiAppDTO.installLimit)
  }

  async getAppLatestVersion(queryWithAppId: any) {
    const versionRecord = await AIAppVersion.findOne({
      limit: 1,
      order: [
        ['id', 'DESC'],
        ['create_time', 'DESC']
      ],
      raw: true,
      where: queryWithAppId
    })
    return versionRecord;
  }

  async getAIAppInfo(req: Request) {
    let id = req.params.id
    const installName = req.params.installName
    const locale = req.query.locale
    const queryOptions = {}
    if(id) {
      //@ts-ignore
      queryOptions.id = id
    }
    if(installName) {
      //@ts-ignore
      queryOptions.installName = installName
    }
    const aiApp = await AIApp.findOne({ raw: true, where: queryOptions });
    id = String(aiApp.id)
    if(!aiApp) {
      return {};
    }
    let aiAppInfoDTO: AIAppDTO
    // console.log('aiAppInfo record, ', record)
    aiAppInfoDTO = Object.assign({} as AIAppDTO, aiApp)
    if(aiApp.tags) {
      aiAppInfoDTO.tags = aiApp.tags.split(',')
      // console.log('aiAppInfoDTO, ', aiAppInfoDTO)
    }
    const queryConditions = {where: {locale, appId: id} }
    const aiAppDesc = await AIAppDesc.findOne(queryConditions)
    this.fillDescData(aiAppInfoDTO, aiAppDesc)
    this.fillInstallLimit(aiAppInfoDTO, aiApp)
    this.fillAccessInfo(aiAppInfoDTO)
    this.fillDownloadInfo(aiAppInfoDTO)
    this.fillLicenseInfo(aiAppInfoDTO)
    this.fillRefLinks(aiAppInfoDTO)
    this.fillSnapshots(aiAppInfoDTO)
    // const latestVersion = this.getAppLatestVersion(queryConditions);
    // aiAppInfoDTO.newVersion = latestVersion.
    return aiAppInfoDTO
  }

  // Only return base info
  async getAIAppBaseInfoById(id: string): Promise<AIAppDTO> {
    const aiApp = await AIApp.findOne({ raw: true, where: { id } });
    if(!aiApp) {
      return {} as AIAppDTO
    }
    let aiAppInfoDTO: AIAppDTO
    aiAppInfoDTO = Object.assign({} as AIAppDTO, aiApp)
    const queryConditions = {where: {appId: id} }
    const aiAppDesc = await AIAppDesc.findOne(queryConditions)
    this.fillDownloadInfo(aiAppInfoDTO)
    return aiAppInfoDTO
  }

  async getAIAppIcon(appId: string) {
    const aiApp = await AIApp.findOne({
      raw: true,
      where: { id: appId },
      attributes: ['id', 'icon']
    });
    if(!aiApp) {
      return ''
    }
    return aiApp.icon
  }


  fillAccessInfo(aiApp: AIAppDTO) {
    try {
      if(aiApp.accessInfo && typeof aiApp.accessInfo === 'string') {
        const accessInfo: AccessInfo = JSON.parse(aiApp.accessInfo)
        aiApp.accessInfo = accessInfo
      }
    } catch (err) {
      console.error(err)
    }
  }

}
