module.exports = (type) => {
    if(!type.deletarPorIdESenha){
        throw new Error (`A classe ${type} não implementou o método deletarPorIdESenha`)
    }

    return type;
}