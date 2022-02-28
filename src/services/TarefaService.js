const TarefaRepository = require('../repositories/impl/PostgreSqlTarefaRepository'); 

class TarefaService {
    constructor(idUsuario) {
        this.idUsuario = idUsuario;
    }

    async listar() {
        const listaTarefas = await TarefaRepository.listarTarefas(this.idUsuario);
        return listaTarefas;
    }

    async cadastrar(dados) {
        const erros = [];
        if (!dados) {
            erros.push("Favor enviar os dados para cadastro da tarefa");
        } else {
            if (!dados.nome || !dados.nome.trim()) {
                erros.push("Nome da tarefa é obrigatório");
            } else if (dados.nome.length < 4) {
                erros.push("Nome da tarefa precisa de pelo menos 4 caractéres");
            }

            if (!dados.dataPrevistaConclusao || !dados.dataPrevistaConclusao.trim()) {
                erros.push("Data prevista conclusão é obrigatório");
            }
        }

        const resposta = {
            erros: null,
            tarefa: null
        }

        if (erros.length) {
            resposta.erros = erros;
        } else {
            const dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao);
            const dataConclusao = dados.dataConclusao
                ? new Date(dados.dataConclusao)
                : null

            const tarefa = {
                nome: dados.nome,
                dataPrevistaConclusao,
                dataConclusao,
                idUsuario: this.idUsuario
            }

            resposta.tarefa = await TarefaRepository.criarTarefa(tarefa);
        }

        return resposta;
    }

    async editar(idTarefa, dados) {
        const erros = [];
        if (!idTarefa) {
            erros.push("ID da tarefa é obrigatório")
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(idTarefa);
            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não encontrada')
            }

            if (dados.nome && dados.nome.trim().length < 4) {
                erros.push("Nome da tarefa precisa ter pelo menos 4 caractéres")
            }
        }

        if (erros.length) {
            return {
                erros
            }
        }

        const dadosAtualizar = {};

        if (dados.nome && dados.nome.trim()) {
            dadosAtualizar.nome = dados.nome;
        }
        if (dados.dataPrevistaConclusao && dados.dataPrevistaConclusao.trim()) {
            dadosAtualizar.dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao)
        }
        if (dados.dataConclusao != null && dados.dataConclusao.trim()) {
            dadosAtualizar.dataConclusao = new Date(dados.dataConclusao)
        }

        const tarefaEditada = await TarefaRepository.editarTarefa(idTarefa, dadosAtualizar);
        return tarefaEditada;
    }

    async deletar(idTarefa) {
        const erros = [];
        if (!idTarefa) {
            erros.push("ID da tarefa é obrigatório")
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(idTarefa);
            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não encontrada')
            }
        }

        const resposta = { erros: null }
        if (erros.length) {
            resposta.erros = erros;
        } else {
            await TarefaRepository.deletarTarefa(idTarefa);
        }

        return resposta;
    }
}

module.exports = TarefaService;