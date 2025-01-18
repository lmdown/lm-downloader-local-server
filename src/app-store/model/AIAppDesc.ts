// src/models/Product.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-app-store';

class AIAppDesc extends Model {
  public id!: number;
  public appId!: number;
  public name!: string;
  public shortDesc?: string;
  public desc?: string;
  public locale!: string;
  public createTime?: Date;
  public updateTime?: Date;
}

AIAppDesc.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 't_ai_app_desc',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default AIAppDesc;
