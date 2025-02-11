/**
 * This Type is defind for Client Side.
 */
export interface AIAppDTO {
  id: string
  name: string
  installName: string
  currentVersion: string
  icon: string
  shortDesc: string
  desc: string
  /**
   * 允许在运行期间更新
   */
  runtimeUpdateAllowed: boolean
  installLimit: InstallLimitDTO
  downloadInfo: AppDownloadDTO[]
  refLinks: AppRefLinkDTO[]
  tags: string[]
  fileStorageTotalSize: string
  newVersion: string
  releaseTime: string
  licenseInfo: string
  accessInfo: AccessInfo
  snapshots: string[]
}

export interface InstallLimitDTO {
  os: string[]
  hardware: string[]
}

export interface AppRefLinkDTO {
  type: string; // homepage, github, other
  url: string;
}

export interface AppDownloadDTO {
  downloadType: string // lmd_base_script 即使用LMD base项目提供的脚本。如果传
  scriptGitRepoUrl: string
}

export interface LicenseInfo {
  /**
   * 协议类型，只有开源的项目，才会写这个，如MIT, GPT-3
   */
  licenseType: string | null | undefined;
  isOpenSource: boolean | null | undefined;
  // 有一些项目开源不彻底，要么新版本不开源，或者某些部分不开源
  isFullOpenSource: boolean | null | undefined;
  // 暂时只收录免费软件。收费的不收录
  isFree: boolean | null | undefined;
  sourceCodeRepo: string | null | undefined;
}

export interface AccessInfo {
  // 访问方式。如果没有，默认为browser。还可以是exec，代表可执行文件，直接打开。
  accessType: string | null | undefined;
  // 如果是browser，这个字段就是访问地址，包括host:port
  webUrl: string | null | undefined;
}
