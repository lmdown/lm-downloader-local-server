import InstalledInstanceRouters from './InstalledInstanceRouters'
import CommonUtilRouters from './CommonUtilRouters'
import { Express } from "express-serve-static-core";

export function initRouters (app: Express) {
  app.use('/api/self-manage/installed-instance', InstalledInstanceRouters);
  app.use('/api/self-manage/common-util', CommonUtilRouters);
}
