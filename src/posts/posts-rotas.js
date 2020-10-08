const postsControlador = require('./posts-controlador')
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
      middlewaresAutenticacao.bearer,
      postsControlador.remover
    )
}
