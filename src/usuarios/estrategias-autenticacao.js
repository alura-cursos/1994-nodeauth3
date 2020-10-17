const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

const Usuario = require('./usuarios-modelo')

const { InvalidArgumentError, NaoAutorizado } = require('../erros')

const bcrypt = require('bcrypt')

const tokens = require('./tokens')

function verificaUsuario (usuario) {
  if (!usuario) {
    throw new NaoAutorizado()
  }
}

async function verificaSenha (senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash)
  if (!senhaValida) {
    throw new NaoAutorizado()
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false
    },
    async (email, senha, done) => {
      try {
        const usuario = await Usuario.buscaPorEmail(email)
        verificaUsuario(usuario)
        await verificaSenha(senha, usuario.senhaHash)

        done(null, usuario)
      } catch (erro) {
        done(erro)
      }
    }
  )
)

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const id = await tokens.access.verifica(token)
      const usuario = await Usuario.buscaPorId(id)
      done(null, usuario, { token })
    } catch (erro) {
      done(erro)
    }
  })
)
