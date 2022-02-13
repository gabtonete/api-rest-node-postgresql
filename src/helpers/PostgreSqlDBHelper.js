const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://glvqurth:T71ez0m40BJaH0YiQGjoXD_7nayJl9qh@kesavan.db.elephantsql.com/glvqurth',
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