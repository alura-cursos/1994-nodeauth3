const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(post) {
    try {
      await dbRun(`INSERT INTO posts (titulo, conteudo, autor) VALUES (?, ?, ?)`, [
        post.titulo,
        post.conteudo,
        post.autor
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o post!');
    }
  },

  async listaPorAutor(idAutor) {
    try {
      return await dbAll(`SELECT id, titulo FROM posts WHERE autor = ?`, [idAutor]);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!');
    }
  },

  async listaTodos() {
    try {
      return await dbAll(`SELECT id, titulo FROM posts`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os posts!');
    }
  },

  async buscaPorId(id) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE id = ?`, [id]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

  async remover(id) {
    try {
      return await dbAll(`DELETE posts WHERE id = ?`, [id]);
    } catch (erro) {
      throw new InternalServerError('Erro ao tentar remover o post!');
    }
  },
};
