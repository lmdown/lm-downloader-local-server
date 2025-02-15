import express, { Request, Response } from 'express';
import path from 'path';
import SystemInfoUtil from '@/util/SystemInfoUtil';
import FileInfoUtil from '@/util/FileInfoUtil';
import AppModelsUtil from '@/util/app-running/AppModelsUtil';
import os from 'os'

const router = express.Router();

router.post('/path-join', (req:Request, res:Response) => {
  const paths: string[] = req.body.paths
  let resultPath = ''
  if(paths) {
    resultPath = path.join(...paths)
  }
  res.json({
    resultPath
  });
});

router.get('/lan-ip', (req:Request, res:Response) => {
  let lanIPs: string[] = SystemInfoUtil.getIPv4Addresses()
  res.json({
    ip: lanIPs
  });
});

router.get('/user-home-dir', (req:Request, res:Response) => {
  const userHomeDir = os.homedir() //process.env.HOME
  res.json({
    userHomeDir
  });
});

// get all models for app
router.get('/installed-model-files/:appInstallName', (req:Request, res:Response) => {
  const appInstallName = req.params.appInstallName
  const models = AppModelsUtil.getAllModels(appInstallName)
  res.json({
    models: models
  });
});

router.get('/dir-file-size', (req:Request, res:Response) => {
  const dirPath = String(req.query.dirPath)
  const fileSize = FileInfoUtil.getDirSize(dirPath)
  res.json({
    dirPath,
    fileSize
  });
});

/**
 * When an app is running, it need some specified env
 */
router.post('/app-running-base-env-info', (req:Request, res:Response) => {
  const keys: string[] = req.body.keys
  const resultObj = {}
  keys.forEach(key => {
    resultObj[key] = SystemInfoUtil.getOSEnv(key) || ''
  })
  res.json(resultObj);
});


router.post('/save-app-running-base-env-info', (req:Request, res:Response) => {
  const envObj: object = req.body.envObj
  console.log('save env ', envObj)
  for(const key in envObj) {
    const value = envObj[key]
    console.log('save key value', key, value)
    SystemInfoUtil.setOSEnv(key, value)
  }
  res.json({
    msg: 'env saved'
  });
});

export default router;
