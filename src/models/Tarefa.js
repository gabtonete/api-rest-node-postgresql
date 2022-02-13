const Sequelize = require('sequelize');
const { sequelize } = require('../helpers/PostgreSqlDBHelper');

const Tarefa = sequelize.define('tarefa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataPrevistaConclusao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataConclusao: {
        type: Sequelize.DATE,
        allowNull: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Tarefa;