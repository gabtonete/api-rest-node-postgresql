const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING,
            { dialect: 'postgres'});

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

module.exports = { PostgreSqlDBHelper, sequelize };