import AIApp from "./AIApp";
import AIAppDesc from "./AIAppDesc";
import AIAppVersion from "./AIAppVersion";
import AppStory from "./AppStory";

export function initModels() {
  // 同步模型
  (async () => {
    try {
      await AIApp.sync();
      await AIAppVersion.sync();
      await AIAppDesc.sync();
      await AppStory.sync();
      console.log('[app-store] Database & tables created!');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  })();
}
