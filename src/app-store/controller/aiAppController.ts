import { Request, Response } from 'express';
import AIApp from '../model/AIApp';

export const getAllAIApps = async (req:Request, res:Response) => {
  const lang = req.query.lang as string;
  try {
    let query = {};
    if (lang) {
      query = { language: lang };
    }
    const records = await AIApp.findAll({ where: query });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

export const getAIApp = async (req:Request, res:Response) => {
  const lang = req.query.lang as string;
  try {
    let query = {};
    if (lang) {
      query = {
        id: req.params.id,
        language: lang
      };
    }
    const record = await AIApp.findOne({ where: query });
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

export const createAIApp = async (req: Request, res: Response) => {
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

export const updateAIApp = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description, price, language } = req.body;
  try {
    const [affectedRows] = await AIApp.update(
      { name, description, price, language },
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

export const deleteAIApp = async (req: Request, res: Response) => {
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
