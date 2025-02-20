import { AIAppDTO } from "@/types/AIAppDTO"
import AppScriptRepoInfo from "@/types/running/AppScriptRepoInfo"

export default class AppScriptRepoUtil {

  static getLMDScriptRepoUrl(lmAppData: AIAppDTO | null | undefined): AppScriptRepoInfo {
    let repoUrl = 'https://gitee.com/lmdown/lmd-install-scripts'
    if(lmAppData?.downloadInfo && lmAppData?.downloadInfo.length > 0) {
      const downloadInfo = lmAppData.downloadInfo[0]
      repoUrl = downloadInfo.scriptGitRepoUrl
    }
    const repoLocalFolderName = this.getLastPathSegment(repoUrl) || 'lmd-install-scripts'
    return {
      repoUrl,
      repoLocalFolderName
    }
  }

  static getLastPathSegment(url: string): string | null {
    const match = url.match(/[^\/?#]+(?=[/?#]*$)/);
    return match ? match[0] : null;
  }

}

