import { DownloadableModelTag } from "./DownloadableModelTag"

export interface DownloadableModel {
  name: string
  installName: string
  tags: DownloadableModelTag[]
}
