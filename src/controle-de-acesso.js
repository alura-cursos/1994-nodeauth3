const ControleDeAcesso = require('accesscontrol')
const controle = new ControleDeAcesso()

controle
  .grant('leitor')
  .readAny('post')

  .grant('editor')
  .extend('leitor')
  .readAny('post')
  .updateOwn('post')
  .createOwn('post')
  .deleteOwn('post')

  .grant('admin')
  .extend('editor')
  .readAny('post')
  .updateAny('post')
  .createAny('post')
  .deleteAny('post')
  .readAny('usuario')
  .updateAny('usuario')
  .createAny('usuario')
  .deleteAny('usuario')

module.exports = controle
