const controle = require('./controle-de-acesso')

module.exports = (entidade, acao) => (req, res, proximo) => {
  const pode = controle.can(req.user.cargo)
  const permissao = pode[acao](entidade)

  if (permissao.granted) {
    proximo()
  } else {
    res.status(403)
    res.end()
  }
}
