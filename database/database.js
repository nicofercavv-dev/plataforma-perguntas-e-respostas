const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = connection