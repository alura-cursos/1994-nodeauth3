const db = require('../../database')
const { InternalServerError } = require('../erros')

const { promisify } = require('util')
const dbRun = promisify(db.run).bind(db)
const dbGet = promisify(db.get).bind(db)
const dbAll = promisify(db.all).bind(db)

module.exports = {
  async adiciona (usuario) {
    try {
      await dbRun(
        `INSERT INTO usuarios (nome, email, senhaHash, emailVerificado, cargo) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          usuario.nome,
          usuario.email,
          usuario.senhaHash,
          usuario.emailVerificado,
          usuario.cargo
        ]
      )
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o usuário!')
    }
  },

  async buscaPorId (id) {
    try {
      return await dbGet('SELECT * FROM usuarios WHERE id = ?', [id])
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!')
    }
  },

  async buscaPorEmail (email) {
    try {
      return await dbGet('SELECT * FROM usuarios WHERE email = ?', [email])
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!')
    }
  },

  async lista () {
    try {
      return await dbAll('SELECT * FROM usuarios')
    } catch (erro) {
      throw new InternalServerError('Erro ao listar usuários!')
    }
  },

  async modificaEmailVerificado (usuario, emailVerificado) {
    try {
      await dbRun('UPDATE usuarios SET emailVerificado = ? WHERE id = ?', [
        emailVerificado,
        usuario.id
      ])
    } catch (erro) {
      throw new InternalServerError('Erro ao modificar a verficação de e-mail!')
    }
  },

  async atualizarSenha (senha, id) {
    try {
      await dbRun('UPDATE usuarios SET senhaHash = ? WHERE id = ?', [
        senha,
        id
      ])
    } catch (erro) {
      throw new InternalServerError('Erro ao tentar atualizar a senha do usuário!')
    }
  },

  async deleta (usuario) {
    try {
      await dbRun('DELETE FROM usuarios WHERE id = ?', [usuario.id])
    } catch (erro) {
      throw new InternalServerError('Erro ao deletar o usuário')
    }
  }
}
