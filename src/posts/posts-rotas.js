const postsControlador = require('./posts-controlador')
const middlewareAutorizacao = require('../middleware-autorizacao')
const { middlewaresAutenticacao } = require('../usuarios')

module.exports = app => {
  app
    .route('/post')
    .get(
      middlewaresAutenticacao.bearer,
      postsControlador.lista
    )
    .post(
      middlewaresAutenticacao.bearer,
      postsControlador.adiciona
    )

  app.route('/post/:id')
    .get(
      middlewaresAutenticacao.bearer,
      postsControlador.obterDetalhes
    )
    .delete(
      [middlewaresAutenticacao.bearer, middlewaresAutenticacao.local],
      postsControlador.remover
    )
}
