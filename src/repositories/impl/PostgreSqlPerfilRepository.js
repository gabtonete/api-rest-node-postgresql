const { PostgreSqlDBHelper } = require('../../helpers/PostgreSqlDBHelper');
const PerfilRepository = require('../PerfilRepository');
const Usuario = require('../../models/Usuario');
const md5 = require('md5')

function sincronizar() {
    PostgreSqlDBHelper.sincronizar();
}

class PostgreSqlPerfilRepository {
    static async deletarPorIdESenha(filtro, senhaFiltro) {
        sincronizar();
        
        const usuarioDb = await Usuario.findOne({ where: {id: filtro} })
        const senhaCodificada = md5(senhaFiltro);

        if (senhaCodificada === usuarioDb.senha) {
            await Usuario.destroy({ where: { id: filtro } });
            return { msg:"Usuário deletado com sucesso" }
        } else {
            return { msg:"Senha incorreta, tente novamente" }
        }
    }
}

module.exports = PerfilRepository(PostgreSqlPerfilRepository);