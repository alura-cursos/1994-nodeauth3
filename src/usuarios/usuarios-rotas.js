const usuariosControlador = require('./usuarios-controlador')
const middlewaresAutenticacao = require('./middlewares-autenticacao')
const autorizacao = require('../middlewares/autorizacao')

module.exports = app => {
  app
    .route('/usuario/trocar-senha')
    .post(usuariosControlador.trocarSenha)

  app
    .route('/usuario/esqueci-minha-senha')
    .post(usuariosControlador.esqueciMinhaSenha)

  app
    .route('/usuario/atualiza_token')
    .post(middlewaresAutenticacao.refresh, usuariosControlador.login)

  app
    .route('/usuario/login')
    .post(middlewaresAutenticacao.local, usuariosControlador.login)

  app
    .route('/usuario/logout')
    .post(
      [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer],
      usuariosControlador.logout
    )

  app
    .route('/usuario/verifica_email/:token')
    .get(
      middlewaresAutenticacao.verificacaoEmail,
      usuariosControlador.verificaEmail
    )

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(
      [middlewaresAutenticacao.bearer, autorizacao('usuario', 'ler')],
      usuariosControlador.lista
    )

  app
    .route('/usuario/:id')
    .delete(
      [middlewaresAutenticacao.bearer, middlewaresAutenticacao.local, autorizacao('usuario', 'remover')], 
      usuariosControlador.deleta
    )
}
