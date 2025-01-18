import AppStory from '../model/AppStory';
import { AppStoryDTO } from '@/types/AppStoryDTO';

export default class AppStoryService {

  async getAppStory(id: string, locale: string = 'en') {
    const record = await AppStory.findOne({ raw: true, where: { id, locale } });
    if(!record) {
      return null;
    }
    let result: AppStoryDTO
    result = Object.assign({} as AppStoryDTO, record)
    if(record.tags) {
      result.tags = record.tags.split(',')
    }
    if(record.relatedAppIds) {
      result.relatedAppIds = record.relatedAppIds.split(',')
    }
    return result
  }

}
