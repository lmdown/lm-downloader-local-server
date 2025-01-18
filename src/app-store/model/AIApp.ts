import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-app-store';

class AIApp extends Model {
  public id!: number;
  public name!: string;
  public installName!: string;
  public licenseInfo?: string;
  public runtimeUpdateAllowed!: boolean; // 默认为1
  public downloadInfo?: string;
  public refLinks?: string;
  public currentVersion?: string;
  public installLimit?: string; // 安装限制，以JSON存储，主要包括操作系统，硬件CPU芯片，GPU芯片的限制
  public icon?: string;
  public tags?: string;
  public snapshots?: string;
  public fileStorageTotalSize?: number;
  public accessInfo?: string;
  public createTime?: Date;
  public updateTime?: Date;
}

AIApp.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    installName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    licenseInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    runtimeUpdateAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    downloadInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refLinks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentVersion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    installLimit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    snapshots: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileStorageTotalSize: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    accessInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 't_ai_app',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default AIApp;
