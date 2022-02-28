const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

class LoginController extends HttpController {
    // Mais uma vez o controller herda o basecontroller e define uma rota própria
    // Escolhendo qual o método http (post), e qual a função relativa à ele (login)
    setupRoutes(baseUrl) {
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    }

    async login(req, res) {

        // guarda na const body os valores do body
        const body = req.body;

        try {
            // valida se os dados recebidos do body são coerentes
            if (!body || !body.login || !body.senha) {
                req.logger.info('requisição de login inválida!');
                return res.status(400).json({
                    status: 400,
                    erro: "Parâmetros de entrada inválidos"
                });
            }

            // na const service, instanciamos um objeto LoginService(), pois ele possuirá os métodos dessa classe
            const service = new LoginService();

            const resultado = await service.logar(body.login, body.senha);

            if (resultado == null) {
                res.status(400).json({
                    erro: "Login ou senha inválidos",
                    status: 400
                });
            }

            req.logger.info('requisição de login realizada com sucesso', `resultado=${JSON.stringify(resultado)}`);
            
            res.json(resultado);

        } catch (e) {
            req.logger.error("erro ao realizar login, erro=" + e.message);

            res.status(500).json({
                erro: "Problema ao realizar login, tente novamente mais tarde",
                status: 500
            });
        }
    }
}

module.exports = LoginController;