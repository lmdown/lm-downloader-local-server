import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-app-store';

class AppStory extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public shortDesc?: string
  public content!: string;
  public coverImageUrl!: string;
  public tags?: string;
  public relatedAppIds?: string;
  public published?: boolean;
  public locale!: string;
  public createTime?: Date;
  public updateTime?: Date;
}

AppStory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coverImageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    relatedAppIds: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 't_app_story',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default AppStory;
