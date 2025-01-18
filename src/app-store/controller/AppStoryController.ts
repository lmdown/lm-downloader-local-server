import { Request, Response } from 'express';
import AppStoryService from '../service/AppStoryService';
import { CommonQuery } from '@/types/CommonQuery';

const service = new AppStoryService()
export const getAppStory = async (req:Request, res:Response) => {
    const {id} = req.params
    const {locale} = req.query as CommonQuery
    const result = await service.getAppStory(id, locale)
    res.json(result);
}
