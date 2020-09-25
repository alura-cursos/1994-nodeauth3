const postsDao = require('./posts-dao');
const validacoes = require('../validacoes-comuns');

class Post {
  constructor(post) {
    this.id = post.id
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.autor = post.idAutor;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  static async buscaPorId(id) {
    const post = await postsDao.buscaPorId(id);
    if (!post) {
      return null;
    }

    return new Post(post);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.titulo, 'titulo');
    validacoes.campoTamanhoMinimo(this.titulo, 'titulo', 5);

    validacoes.campoStringNaoNulo(this.conteudo, 'conteudo');
    validacoes.campoTamanhoMaximo(this.conteudo, 'conteudo', 140);
  }

  remover(){
    return postsDao.remover(this);
  }

  static listarPorAutor(idAutor) {
    return postsDao.lista(idAutor);
  }

  static listarTodos() {
    return postsDao.listarTodos();
  }
 
}

module.exports = Post;
