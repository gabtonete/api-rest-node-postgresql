module.exports = (type) => {
    if(!type.criarTarefa){
        throw new Error (`A classe ${type} não implementou o método criarTarefa`)
    }
    
    return type;
}