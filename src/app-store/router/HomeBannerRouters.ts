import express from 'express';
import {
  getHomeBanners
} from '../controller/HomeBannerController';

const router = express.Router();

router.get('/', getHomeBanners);

export default router;
