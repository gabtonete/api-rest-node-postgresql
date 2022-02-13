const TarefaRepository = require("../TarefaRepository");
const Tarefa = require('../../models/Tarefa');
const { PostgreSqlDBHelper }  = require('../../helpers/PostgreSqlDBHelper');

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
}

module.exports = TarefaRepository(PostgreSqlTarefaRepository);