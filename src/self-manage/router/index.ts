import installedInstanceRouters from './InstalledAIAppRouters'
import { Express } from "express-serve-static-core";

export function initRouters (app: Express) {
  app.use('/api/self-manage/installed-instance', installedInstanceRouters);
}
