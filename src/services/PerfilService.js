const PerfilRepository = require("../repositories/impl/PostgreSqlPerfilRepository");

class PerfilService {
    deletarPerfil(idLogado, senhaBody) {
        const erros = []
        
        if(!idLogado) {
            erros.push("ID do usuário obrigatória")
            return { erros }
        }
        const filtro = idLogado;
        const senhaFiltro = senhaBody;

        return PerfilRepository.deletarPorIdESenha(filtro, senhaFiltro)
    }
}

module.exports = PerfilService;