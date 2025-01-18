import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-self-manage';

class InstalledInstance extends Model {
  // [symbol: string]: any;
  [key: string]: any;
  public id!: number;
  public appId?: number;
  // App的名称，如果是能查到App信息的，会标出来正常的名字。当然显示给用户时，会被desc表中的name替换掉
  // 如果查不到，就用应用的文件名本身
  public name!: string;
  public version?: string;
  // default 使用LMD安装脚本执行后安装的， import 是从本机路径导入的
  public installMethod?: string;
  public installName?: string;
  public fileStorageTotalSize?: number;
  public totalSizeCalcTime?: Date;
  public createTime?: Date;
  public updateTime?: Date;
}

InstalledInstance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    installMethod: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    installName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileStorageTotalSize: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    totalSizeCalcTime: {
      type: DataTypes.DATE,
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
    tableName: 't_installed_instance',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default InstalledInstance;
