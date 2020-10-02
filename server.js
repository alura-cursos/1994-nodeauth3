require('dotenv').config()
const { InvalidArgumentError, PermissaoNegada, NaoEncontrado } = require('./src/erros')
const jwt = require('jsonwebtoken')
const app = require('./app')
const port = 3000

require('./database')
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')

const routes = require('./rotas')
routes(app)

app.use((erro, req, res, proximo) => {
  const corpo = {
    mensagem: erro.message
  }
  let status = 500

  if (erro instanceof InvalidArgumentError) {
    status = 400
  }

  if (erro instanceof PermissaoNegada) {
    status = 403
  }

  if (erro instanceof jwt.JsonWebTokenError || erro instanceof jwt.TokenExpiredError) {
    status = 401
    corpo.expiradoEm = erro.expiredAt
  }

  if (erro instanceof NaoEncontrado) {
    status = 404
  }

  res.status(status)
  res.send(corpo)
})

app.listen(port, () => console.log('A API está funcionando!'))
