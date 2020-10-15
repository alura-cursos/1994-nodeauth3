module.exports = (cargosObrigatorios) => (requisicao, resposta, proximo) => {
    requisicao.user.cargo = 'admin'

    if (cargosObrigatorios.indexOf(requisicao.user.cargo) === -1) {
        resposta.status(403)
        resposta.end()
        return
    }

    proximo()
}