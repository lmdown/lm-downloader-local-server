import express from 'express';
import {
  createInstalledInstance,
  getInstalledInstanceForRunning,
  getInstalledInstanceForApp,
  updateInstalledInstance,
  deleteInstalledInstance,
  createInstalledInstanceByApp,
  getInstalledInstanceList,
  checkVersion
} from '../controller/InstalledInstanceController';

const router = express.Router();


router.get('/', getInstalledInstanceList);
router.get('/app/:appId', getInstalledInstanceForApp);
router.get('/:id', getInstalledInstanceForRunning);
router.post('/', createInstalledInstance);
router.post('/app/:appId', createInstalledInstanceByApp);
router.post('/app/:appId/type/:installType', createInstalledInstanceByApp);
router.put('/:id', updateInstalledInstance);
router.delete('/:id', deleteInstalledInstance);

router.get('/check-version/:installName', checkVersion);


export default router;
