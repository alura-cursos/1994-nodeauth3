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

  async listar (idAutor) {
    try {
      let instrucoes = 'SELECT id, titulo FROM posts'
      const params = []

      if (idAutor) {
        instrucoes = `${instrucoes} WHERE autor = ?`
        params.push(idAutor)
      }

      return await dbAll(instrucoes, params)
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!')
    }
  },

  async buscaPorId (id, idAutor) {
    try {
      let instrucoes = 'SELECT * FROM posts WHERE id = ?'
      const parametros = [id]

      if (idAutor) {
        instrucoes = `${instrucoes} AND autor = ?`
        parametros.push(idAutor)
      }

      return await dbGet(instrucoes, parametros)
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
