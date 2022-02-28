const TarefaRepository = require("../TarefaRepository");
const Tarefa = require('../../models/Tarefa');
const { PostgreSqlDBHelper } = require('../../helpers/PostgreSqlDBHelper');

function sincronizar() {
    PostgreSqlDBHelper.sincronizar();
}

class PostgreSqlTarefaRepository {
    static async criarTarefa(dados) {
        sincronizar();
        await Tarefa.create({
            nome: dados.nome,
            dataPrevistaConclusao: dados.dataPrevistaConclusao,
            dataConclusao: dados.dataConclusao,
            idUsuario: dados.idUsuario
        })
    }

    static async listarTarefas(idUsuarioLogado) {
        sincronizar();
        return await Tarefa.findAll({ where: { idUsuario: idUsuarioLogado } })
    }

    static async buscarPorId(idTarefa) {
        sincronizar();
        return await Tarefa.findOne({ where: { id: idTarefa } })
    }

    static async editarTarefa(idTarefa, dadosAtualizados) {
        sincronizar();
        return await Tarefa.update( {
            nome: dadosAtualizados.nome,
            dataPrevistaConclusao: dadosAtualizados.dataPrevistaConclusao,
            dataConclusao: dadosAtualizados.dataConclusao
        }, { where: { id:idTarefa } })
    }

    static async deletarTarefa(idTarefa) {
        sincronizar();
        return await Tarefa.destroy( { where: { id: idTarefa } })
    }
    
}

module.exports = TarefaRepository(PostgreSqlTarefaRepository);