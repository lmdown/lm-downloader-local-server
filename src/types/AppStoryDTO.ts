export interface AppStoryDTO {
  id: string;
  title: string;
  slug: string;
  shortDesc: string
  content: string;
  coverImageUrl?: string;
  tags?: string[];
  relatedAppIds?: string[];
  published: boolean;
  locale: string;
  createTime: Date
  updateTime: Date
}
