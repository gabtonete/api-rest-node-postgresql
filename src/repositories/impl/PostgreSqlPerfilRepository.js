const PerfilRepository = require('../PerfilRepository');
const Usuario = require('../../models/Usuario');
const md5 = require('md5')

class PostgreSqlPerfilRepository {
    static async buscarUsuario(nomeBody) { 
        return await Usuario.findAll({ where: {nome: nomeBody} })
    }

    static async deletarPorIdESenha(filtro, senhaFiltro) {

        console.log(filtro);
        const usuarioDb = await Usuario.findOne({ where: {id: filtro} })
        console.log(usuarioDb);

        const senhaCodificada = md5(senhaFiltro);
        console.log(senhaCodificada);

        if (senhaCodificada === usuarioDb.senha) {
            await Usuario.destroy({ where: { id: filtro } });
            return { msg:"Usuário deletado com sucesso" }
        } else {
            return { msg:"Senha incorreta, tente novamente" }
        }

        
    }
}

module.exports = PerfilRepository(PostgreSqlPerfilRepository);