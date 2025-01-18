import express from 'express';
import {
  getAppStory
} from '../controller/AppStoryController';

const router = express.Router();

router.get('/:id', getAppStory);

export default router;
