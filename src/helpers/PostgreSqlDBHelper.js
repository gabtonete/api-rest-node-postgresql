const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING, { logging: false });

async function conectadoDb() {
    await sequelize.authenticate();
    console.log("Conectado ao MySQL")
}

class PostgreSqlDBHelper {
    static async sincronizar() {
        try {
            await sequelize.sync({ force: false });
            console.log("Table sincronizada");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { PostgreSqlDBHelper, sequelize, conectadoDb };