import { Request, Response } from 'express';
import InstalledInstance from '../model/InstalledInstance';
import { AIAppDTO, AppDownload } from '@/types/AIAppDTO';
import InstalledInstanceService from '../service/InstalledInstanceService';
import AIAppDesc from '@/app-store/model/AIAppDesc';
import CheckVersionUtil from '@/util/CheckDesktopAppUtil';

const service = new InstalledInstanceService()

export const getInstalledInstanceList = async (req:Request, res:Response) => {
  const result = await service.getInstalledInstanceList()
  res.json(result);
};

export const getInstalledInstanceForApp = async (req:Request, res:Response) => {
    const appId = req.params.appId
    const result = await service.getInstalledInstanceForApp(appId)
    res.json(result);
}

export const getInstalledInstanceForRunning = async (req:Request, res:Response) => {
  const result = await service.getInstalledInstance(req.params.id)
  res.json(result);
}

export const createInstalledInstanceByApp = async (req: Request, res: Response) => {
  const appDTO = req.body as AIAppDTO
  const installType = req.params.installType
  try {
    const instances = await service.getInstalledInstanceForApp(appDTO.id)
    if(instances && instances.length > 0) {
      res.status(200).json({
        msg: 'install instance exist'
      })
    }
    const newRecord = await service.createInstanceByApp(appDTO, installType)
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'errors.create' });
  }
};

export const createInstalledInstance = async (req: Request, res: Response) => {
  const reqData = req.body
  try {
    const record = await InstalledInstance.create(reqData);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'errors.create' });
  }
};

export const updateInstalledInstance = async (req: Request, res: Response) => {
  const id = req.params.id;
  const reqData = req.body
  try {
    const [affectedRows] = await InstalledInstance.update(
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

export const deleteInstalledInstance = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const affectedRows = await InstalledInstance.destroy({ where: { id: parseInt(id, 10) } });
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'errors.notFound' });
    }
    res.status(200).json({ message: 'success.deleted' });
  } catch (error) {
    res.status(500).json({ error: 'errors.database' });
  }
};

export const checkVersion = async (req: Request, res: Response) => {
  const installName = req.params.installName;
  const version = await CheckVersionUtil.checkVersionByName(installName)
  res.json(version);
}
