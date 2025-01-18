import { env } from "@/envConfig";
import { app, logger } from "@/server";
import WSServer from "./self-manage/websockets/WSServer";

export default class LMDServer {

  // _port: number;

  // constructor(port: number) {

  // }

  start() {
    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });
    // 初始化 WebSocket 服务器
    const wsServer = new WSServer(app, server);
    wsServer.start();

    const onCloseSignal = () => {
      logger.info("sigint received, shutting down");
      server.close(() => {
        logger.info("server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };


    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  }
}
