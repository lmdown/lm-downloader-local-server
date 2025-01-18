import express from 'express';
import {
  getAIAppInfo,
  getAIAppInfoList,
  createAIAppInfo,
  updateAIAppInfo,
  deleteAIAppInfo
} from '../controller/aiAppInfoController';

const router = express.Router();

router.get('/', getAIAppInfoList);
router.get('/:id', getAIAppInfo);
router.post('/', createAIAppInfo);
router.put('/:id', updateAIAppInfo);
router.delete('/:id', deleteAIAppInfo);

export default router;
