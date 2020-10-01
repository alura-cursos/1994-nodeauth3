const postsControlador = require('./posts-controlador')
const middlewareAutorizacao = require('../middleware-autorizacao')
const { middlewaresAutenticacao } = require('../usuarios')

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      [middlewaresAutenticacao.bearer, middlewareAutorizacao('post', 'criar')],
      postsControlador.adiciona
    )

  app.route('/post/:id')
    .get(postsControlador.obterDetalhes)
    .delete(
      [middlewaresAutenticacao.bearer, middlewaresAutenticacao.local, middlewareAutorizacao('post', 'remover')],
      postsControlador.remover
    )
}
