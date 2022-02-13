const { PostgreSqlDBHelper } = require('../../helpers/PostgreSqlDBHelper');
const Usuario = require('../../models/Usuario');
const UsuarioRepository = require('../UsuarioRepository');

function sincronizar() {
    PostgreSqlDBHelper.sincronizar();
}

class PostgreSqlUsuarioRepository {
    static async criarUsuario(dados) {
        sincronizar();
        await Usuario.create({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha
        })
    }

    static async filtrarPorEmail(emailString) {
        sincronizar();
        return await Usuario.findOne({ where: { email: emailString } });
    }

    static async filtrarLogin(filtro) {
        sincronizar();
        return await Usuario.findOne({ where: { email: filtro.email, senha: filtro.senha } })
    }

    static async filtrarPorId(decodedId) {
        sincronizar();
        return await Usuario.findOne({ where: { id: decodedId } })
    }
}

module.exports = UsuarioRepository(PostgreSqlUsuarioRepository);