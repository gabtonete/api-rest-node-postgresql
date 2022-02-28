module.exports = (type) => {
    if(!type.criarTarefa){
        throw new Error (`A classe ${type} não implementou o método criarTarefa`)
    }

    if(!type.listarTarefas){
        throw new Error (`A classe ${type} não implementou o método listarTarefas`)
    }

    
    if(!type.buscarPorId){
        throw new Error (`A classe ${type} não implementou o método buscarPorId`)
    }

    if(!type.editarTarefa){
        throw new Error (`A classe ${type} não implementou o método editarTarefa`)
    }

    if(!type.deletarTarefa){
        throw new Error (`A classe ${type} não implementou o método deletarTarefa`)
    }
    
    return type;
}