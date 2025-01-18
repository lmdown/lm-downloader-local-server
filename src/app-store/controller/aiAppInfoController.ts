import { Request, Response } from 'express';
import AIApp from '../model/AIApp';
import AIAppInfoService from '../service/aiAppInfoService';

const service = new AIAppInfoService()
export const getAIAppInfoList = async (req:Request, res:Response) => {
  //const locale = req.query.locale as string;
  try {
    const resultAppInfoList = await service.getPageList(req)
    // console.log('resultAppInfoList', resultAppInfoList)
    res.json(resultAppInfoList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

export const getAIAppInfo = async (req:Request, res:Response) => {
  const lang = req.query.lang as string;
  try {
    // const records = await AIApp.findOne({ where: query });
    const record = await service.getAIAppInfo(req)
    // console.log('record', record)
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

export const createAIAppInfo = async (req: Request, res: Response) => {
  //const { name, description, price, language } = req.body;
  const reqData = req.body
  try {
    // const record = await AIApp.create({ name, description, price, language });
    const record = await AIApp.create(reqData);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'errors.database' });
  }
};

export const updateAIAppInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const reqData = req.body;
  try {
    const [affectedRows] = await AIApp.update(
      reqData,
      { where: { id: parseInt(id, 10) } }
    );
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'errors.notFound' });
    }
    res.status(200).json({ message: 'success.updated' });
  } catch (error) {
    res.status(500).json({ error: 'errors.database' });
  }
};

export const deleteAIAppInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const affectedRows = await AIApp.destroy({ where: { id: parseInt(id, 10) } });
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'errors.notFound' });
    }
    res.status(200).json({ message: 'success.deleted' });
  } catch (error) {
    res.status(500).json({ error: 'errors.database' });
  }
};
