const Sequelize = require('sequelize')
const connection = require('../database')

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({ force: false }).then(() => {}) 
// o 'force: false' define que não se deve forçar a criação de uma tabela Pergunta se já existir uma

module.exports = Pergunta