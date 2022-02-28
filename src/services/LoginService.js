const jwt = require('jsonwebtoken');
const md5 = require('md5');
const UsuarioRepository = require('../repositories/impl/PostgreSqlUsuarioRepository');

class LoginService {
    async logar(login, senha) {

        const filtro = {
            email: login,
            senha: md5(senha)
        }

        const usuarios = await UsuarioRepository.filtrarLogin(filtro);

        if (usuarios == null) {
            return null;
        }

        const token = jwt.sign({ id: usuarios.id }, process.env.CHAVE_SECRETA_JWT);

        return ({
            id: usuarios.id,
            nome: usuarios.nome,
            email: usuarios.email,
            token
        })
    }
}

module.exports = LoginService;