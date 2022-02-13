module.exports = (type) => {
    if(!type.criarUsuario){
        throw new Error (`A classe ${type} não implementou o método criarUsuario`)
    }
    if(!type.filtrarPorEmail){
        throw new Error (`A classe ${type} não implementou o método filtrar`)
    }
    if(!type.filtrarLogin){
        throw new Error (`A classe ${type} não implementou o método filtrarLogin`)
    }
    if(!type.filtrarPorId){
        throw new Error (`A classe ${type} não implementou o método filtrarPorId`)
    }
    
    return type;
}