const autorizacao = require('./autorizacao')

module.exports = (entidade, acao) => (requisicao, resposta, proximo) => {
    if (requisicao.estaAutenticado === true) {
        return autorizacao(entidade, acao)(requisicao, resposta, proximo)
    }

    proximo()
}