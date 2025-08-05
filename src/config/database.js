// config/database.js
import Sequelize from 'sequelize';

const sequelize = new Sequelize('resource', 'postgres', 'Pass1234!', {
  host: '192.168.21.100',
  dialect: 'postgres',
});

export default sequelize;
