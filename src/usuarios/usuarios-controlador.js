const Usuario = require('./usuarios-modelo')

const tokens = require('./tokens')
const { EmailVerificacao } = require('./emails')
const { PermissaoNegada } = require('../erros')

function geraEndereco (rota, token) {
  const baseURL = process.env.BASE_URL
  return `${baseURL}${rota}${token}`
}

module.exports = {
  async adiciona (req, res, proximo) {
    const { nome, email, senha, cargo } = req.body

    try {
      const usuario = new Usuario({
        nome,
        email,
        cargo,
        emailVerificado: false
      })
      await usuario.adicionaSenha(senha)
      await usuario.adiciona()

      const token = tokens.verificacaoEmail.cria(usuario.id)
      const endereco = geraEndereco('/usuario/verifica_email/', token)
      const emailVerificacao = new EmailVerificacao(usuario, endereco)
      await emailVerificacao.enviaEmail()

      res.status(201).json()
    } catch (erro) {
      proximo(erro)
    }
  },

  async login (req, res, proximo) {
    try {
      const accessToken = tokens.access.cria(req.user.id)
      const refreshToken = await tokens.refresh.cria(req.user.id)
      res.set('Authorization', accessToken)
      res.status(200).json({ refreshToken })
    } catch (erro) {
      proximo(erro)
    }
  },

  async logout (req, res, proximo) {
    try {
      const token = req.token
      await tokens.access.invalida(token)
      res.status(204).json()
    } catch (erro) {
      proximo(erro)
    }
  },

  async lista (req, res, proximo) {
    try {
      if (!req.acesso.todos) {
        throw new PermissaoNegada()
      }

      const usuarios = await Usuario.lista()
      res.json(usuarios)
    } catch (erro) {
      proximo(erro)
    }
  },

  async verificaEmail (req, res, proximo) {
    try {
      const usuario = req.user
      await usuario.verificaEmail()
      res.status(200).json()
    } catch (erro) {
      proximo(erro)
    }
  },

  async deleta (req, res, proximo) {
    try {
      if (!req.acesso.todos) {
        throw new PermissaoNegada()
      }

      const usuario = await Usuario.buscaPorId(req.params.id)
      await usuario.deleta()
      res.status(200).json()
    } catch (erro) {
      proximo(erro)
    }
  }
}
