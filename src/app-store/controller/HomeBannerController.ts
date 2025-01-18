import { Request, Response } from 'express';
import HomeBannerService from '../service/HomeBannerService';
import { CommonQuery } from '@/types/CommonQuery';

const service = new HomeBannerService()
export const getHomeBanners = async (req:Request, res:Response) => {
    const {locale} = req.query as CommonQuery
    const result = await service.getBanners(locale)
    res.json(result);
}
