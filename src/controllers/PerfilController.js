const PerfilService = require('../services/PerfilService');
const HttpController = require('./HttpController');

class PerfilController extends HttpController {
    setupRoutes(baseUrl) {
        this.express.delete(`${baseUrl}/perfil`, this.deletarPerfil.bind(this));
    }

    async deletarPerfil(req, res) {
        try {
            const idLogado = req.usuario.id;
            const senhaBody = req.body.senha;

            const service = new PerfilService();

            const resp = await service.deletarPerfil(idLogado, senhaBody);

            res.json(resp)
        } catch (e) {
            req.logger.error("erro ao excluir conta, erro=" + e.message);

            res.status(500).json({
                erro: "Problema ao excluir conta, tente novamente mais tarde",
                status: 500
            });
        }
    }
}

module.exports = PerfilController;