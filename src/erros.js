class InvalidArgumentError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InvalidArgumentError'
  }
}

class InternalServerError extends Error {
  constructor (mensagem) {
    super(mensagem)
    this.name = 'InternalServerError'
  }
}

class PermissaoNegada extends Error {
  constructor () {
    const mensagem = 'Permissão de acesso negada. Verifique suas credenciais.'
    super(mensagem)
    this.name = 'PermissaoNegada'
  }
}

class NaoEncontrado extends Error {
  constructor () {
    const mensagem = 'Não encontrado'
    super(mensagem)
    this.name = 'PermissaoNegada'
  }
}

module.exports = { InvalidArgumentError, InternalServerError, PermissaoNegada, NaoEncontrado }
