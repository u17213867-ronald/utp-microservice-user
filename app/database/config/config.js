const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  username: process.env['DB_ROOT_USERNAME'],
  password: process.env['DB_ROOT_PASSWORD'],
  database: process.env['DB_NAME'],
  port: process.env['DB_PORT'],
  host: process.env['DB_HOST'],
  dialect: 'mysql',
  migrationStorageTableName: 'sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
}
