const AccessControl = require('accesscontrol')
const controle = new AccessControl()

controle.grant('assinante').readAny('post', ['id', 'titulo', 'conteudo', 'autor'])

module.exports = controle