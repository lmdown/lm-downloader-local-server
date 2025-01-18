import aiAppsRoutes from './aiAppRouters'
import aiAppInfoRouters from './aiAppInfoRouters'
import appStoryRouters from './AppStoryRouters'
import homeBannerRouters from './HomeBannerRouters'
import { Express } from "express-serve-static-core";

export function initRouters (app: Express) {
  app.use('/api/app-store/ai-app', aiAppsRoutes);
  app.use('/api/app-store/ai-app-info', aiAppInfoRouters);
  app.use('/api/app-store/app-story', appStoryRouters);
  app.use('/api/app-store/home-banner', homeBannerRouters);
}

