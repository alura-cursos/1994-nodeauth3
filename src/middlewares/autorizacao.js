const controle = require('../controleDeAcesso')

module.exports = (entidade, acao) => (requisicao, resposta, proximo) => {
    const permissoesDoCargo = controle.can(requisicao.user.cargo)
    const permissao = permissoesDoCargo[acao](entidade)
    
    if (permissao.granted === false) {
        resposta.status(403)
        resposta.end()
        return
    }

    requisicao.acesso = {
        atributos: permissao.attributes
    }

    proximo()
}