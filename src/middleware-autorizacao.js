const controle = require('./controle-de-acesso')

const acoes = {
  ler: { todos: 'readAny', apenasSeu: 'readOwn' },
  escrever: { todos: 'createAny', apenasSeu: 'createOwn' },
  atualizar: { todos: 'updateAny', apenasSeu: 'updateOwn' },
  remover: { todos: 'deleteAny', apenasSeu: 'deleteOwn' }
}

module.exports = (entidade, acao) => (req, res, proximo) => {
  const pode = controle.can(req.user.cargo)
  const metodosDoControle = acoes[acao]
  const podeTodos = pode[metodosDoControle.todos](entidade)
  const podeApenasSeu = pode[metodosDoControle.apenasSeu](entidade)

  if (!podeTodos.granted && !podeApenasSeu.granted) {
    res.status(403)
    res.end()
    return
  }

  req.acesso = {
    todos: podeTodos.granted,
    apenasSeu: podeApenasSeu.granted
  }

  proximo()
}
