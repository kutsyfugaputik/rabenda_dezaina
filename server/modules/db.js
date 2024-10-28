const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
process.env.DB_NAME, // имя бд
process.env.DB_USER,
process.env.DB_PASSWORD,
{
    dialect: 'postgres',
    host: process.env.DB_HOTS,
    port: process.env.DB_PORT
}

)