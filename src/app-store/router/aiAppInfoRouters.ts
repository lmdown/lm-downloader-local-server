import express from 'express';
import {
  getAIAppInfo,
  getAIAppInfoList,
  createAIAppInfo,
  updateAIAppInfo,
  deleteAIAppInfo,
  getAIAppInfoByInstallName
} from '../controller/aiAppInfoController';

const router = express.Router();

router.get('/', getAIAppInfoList);
router.get('/:id', getAIAppInfo);
router.get('/install-name/:installName', getAIAppInfoByInstallName);
router.post('/', createAIAppInfo);
router.put('/:id', updateAIAppInfo);
router.delete('/:id', deleteAIAppInfo);

export default router;
