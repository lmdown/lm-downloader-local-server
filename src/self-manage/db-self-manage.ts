import PathUtil from '@/util/PathUtil';
import { Sequelize } from 'sequelize';

const dbPath = PathUtil.getSelfManageDBPath('self-manage.db')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: true,
    query: { raw:true }
});

export default sequelize;
