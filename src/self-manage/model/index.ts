import FileStorageInfo from "./FileStorageInfo";
import InstalledAIApp from "./InstalledInstance";

export function initModels() {
  // 同步模型
  (async () => {
    try {
      await FileStorageInfo.sync();
      await InstalledAIApp.sync();
      console.log('[self-manage] Database & tables created!');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  })();
}
