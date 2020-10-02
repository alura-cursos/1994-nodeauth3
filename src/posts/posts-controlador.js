const Post = require('./posts-modelo')
const controle = require('../controle-de-acesso')

module.exports = {
  async adiciona (req, res, proximo) {
    try {
      req.body.autor = req.user.id
      const post = new Post(req.body)
      await post.adiciona()

      res.status(201).json(post)
    } catch (erro) {
      proximo(erro)
    }
  },

  async lista (req, res, proximo) {
    try {
      const posts = await Post.listarTodos()
      res.json(posts)
    } catch (erro) {
      proximo(erro)
    }
  },

  async obterDetalhes (req, res, proximo) {
    try {
      const post = await Post.buscaPorId(req.params.id)
      res.json(post)
    } catch (erro) {
      proximo(erro)
    }
  },

  async remover (req, res, proximo) {
    try {
      let post

      if (req.acesso.todos) {
        post = await Post.buscaPorId(req.params.id)
      }

      if (req.acesso.todos) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      proximo(erro)
    }
  }
}
