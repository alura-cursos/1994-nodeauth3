const usuariosDao = require('./usuarios-dao')
const { InvalidArgumentError, NaoEncontrado } = require('../erros')
const validacoes = require('../validacoes-comuns')
const bcrypt = require('bcrypt')

/**
 * A classe Usuario é responsável por gerenciar todas as operações relacionadas a usuários
 */
class Usuario {
  /**
   * O construtor recebe os dados de um usuário e os atribui a instância atual
   * @param {object} usuario 
   */
  constructor (usuario) {
    this.id = usuario.id
    this.nome = usuario.nome
    this.email = usuario.email
    this.senhaHash = usuario.senhaHash
    this.emailVerificado = usuario.emailVerificado
    this.cargo = usuario.cargo
    this.valida()
  }

  /**
   * @throws {InvalidArgumentError} - Esse erro ocorre quando um usuário com o mesmo e-mail já está cadastrado
   */
  async adiciona () {
    if (await usuariosDao.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!')
    }

    await usuariosDao.adiciona(this)
    const { id } = await usuariosDao.buscaPorEmail(this.email)
    this.id = id
  }

  async adicionaSenha (senha) {
    validacoes.campoStringNaoNulo(senha, 'senha')
    validacoes.campoTamanhoMinimo(senha, 'senha', 8)
    validacoes.campoTamanhoMaximo(senha, 'senha', 64)

    this.senhaHash = await Usuario.gerarSenhaHash(senha)
  }

  atualizarSenha () {
    return usuariosDao.atualizarSenha(this.senhaHash, this.id)
  }

  valida () {
    validacoes.campoStringNaoNulo(this.nome, 'nome')
    validacoes.campoStringNaoNulo(this.email, 'email')
    const cargosValidos = ['admin', 'editor', 'assinante']

    if (cargosValidos.indexOf(this.cargo) === -1) {
      throw new InvalidArgumentError('O campo cargo está inválido')
    }
  }

  async verificaEmail () {
    this.emailVerificado = true
    await usuariosDao.modificaEmailVerificado(this, this.emailVerificado)
  }

  async deleta () {
    return usuariosDao.deleta(this)
  }

  static async buscaPorId (id) {
    const usuario = await usuariosDao.buscaPorId(id)
    if (!usuario) {
      throw new NaoEncontrado('usuário')
    }

    return new Usuario(usuario)
  }

  static async buscaPorEmail (email) {
    const usuario = await usuariosDao.buscaPorEmail(email)
    if (!usuario) {
      throw new NaoEncontrado('usuário')
    }

    return new Usuario(usuario)
  }

  static lista () {
    return usuariosDao.lista()
  }

  static gerarSenhaHash (senha) {
    const custoHash = 12
    return bcrypt.hash(senha, custoHash)
  }
}

module.exports = Usuario
