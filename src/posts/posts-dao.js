const db = require('../../database')
const { InternalServerError } = require('../erros')

const { promisify } = require('util')
const dbRun = promisify(db.run).bind(db)
const dbGet = promisify(db.get).bind(db)
const dbAll = promisify(db.all).bind(db)

module.exports = {
  async adiciona (post) {
    try {
      await dbRun('INSERT INTO posts (titulo, conteudo, autor) VALUES (?, ?, ?)', [
        post.titulo,
        post.conteudo,
        post.autor
      ])
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o post!')
    }
  },

  async listarPorAutor (idAutor) {
    try {
      return await dbAll('SELECT id, titulo FROM posts WHERE autor = ?', [idAutor])
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!')
    }
  },

  async listarTodos () {
    try {
      return await dbAll('SELECT id, titulo FROM posts')
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!')
    }
  },

  async buscaPorId (id, idAutor) {
    try {
      return await dbGet('SELECT * FROM posts WHERE id = ? AND autor = ?', [id, idAutor])
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o post!')
    }
  },

  async remover ({ id, autor }) {
    try {
      return await dbRun('DELETE FROM posts WHERE id = ? AND autor = ?', [id, autor])
    } catch (erro) {
      throw new InternalServerError('Erro ao tentar remover o post!')
    }
  }
}
