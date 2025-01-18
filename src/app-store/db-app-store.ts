import PathUtil from '@/util/PathUtil';
import path from 'path'
import { Sequelize } from 'sequelize';

const dbPath = PathUtil.getAppStoreDBPath('app-store.db')
console.log('dbPath', dbPath)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: true,
    query: { raw:true }
});

export default sequelize;
