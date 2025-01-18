// src/models/Product.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-app-store';

class AIAppVersion extends Model {
  public id!: number;
  public appId!: number;
  public version!: string;
  public icon?: string;
  public releaseTime?: Date;
  public releaseNotes?: string;
  public locale!: string;
  public createTime?: Date;
  public updateTime?: Date;
}

AIAppVersion.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    releaseNotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 't_ai_app_version',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default AIAppVersion;
