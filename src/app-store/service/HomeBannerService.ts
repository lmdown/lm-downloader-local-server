import { HomeBannerDTO } from '@/types/HomeBannerDTO';
import AppStory from '../model/AppStory';

export default class HomeBannerService {

  async getBanners(locale: string = 'en') {
    const records = await AppStory.findAll({ raw: true, where: { locale } });
    if(!records) {
      return null;
    }
    let resultList: HomeBannerDTO[] = records.map(item => {
      const banner = {} as HomeBannerDTO
      banner.id = String(item.id)
      banner.title = item.title
      banner.shortDesc = item.shortDesc
      banner.coverImageUrl = item.coverImageUrl
      banner.createTime = item.createTime
      banner.updateTime = item.updateTime
      return banner
    })
    return resultList
  }

}
