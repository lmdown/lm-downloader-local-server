import express from 'express';
import {
  createAIApp,
  getAIApp,
  updateAIApp,
  getAllAIApps,
  deleteAIApp
} from '../controller/aiAppController';

const router = express.Router();

router.get('/', getAllAIApps);
router.get('/:id', getAIApp);
router.post('/', createAIApp);
router.put('/:id', updateAIApp);
router.delete('/:id', deleteAIApp);

export default router;
