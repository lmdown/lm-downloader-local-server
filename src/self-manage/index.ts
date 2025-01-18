import { initModels } from "./model";
import { initRouters } from "./router";
import { Express } from "express-serve-static-core";

export function initSelfManageModule(app: Express) {
  initModels()
  initRouters(app)
}
