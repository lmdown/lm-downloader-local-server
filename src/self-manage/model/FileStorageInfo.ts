import { DataTypes, Model } from 'sequelize';
import sequelize from '../db-self-manage';

class FileStorageInfo extends Model {
  public id!: number;
  public installedInstanceId!: number;
  public type?: string;
  public icon?: string;
  public location?: string;
  public size?: number;
  public deviceType?: string;
  public storageMediaType?: string;
}

FileStorageInfo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    installedInstanceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    deviceType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    storageMediaType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 't_file_storage_info',
    timestamps: true,
    createdAt: "create_time",
    updatedAt: "update_time",
    underscored: true,
  }
);

export default FileStorageInfo;
