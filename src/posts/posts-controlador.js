const Post = require('./posts-modelo')
const { InvalidArgumentError } = require('../erros')

module.exports = {
  async adiciona (req, res) {
    try {
      req.body.autor = req.user.id
      const post = new Post(req.body)
      await post.adiciona()

      res.status(201).json(post)
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message })
      }
      res.status(500).json({ erro: erro.message })
    }
  },

  async lista (req, res) {
    try {
      let posts

      if (req.user.cargo === 'admin') {
        posts = await Post.listarTodos()
      } else {
        posts = await Post.listarPorAutor(req.user.id)
      }

      res.json(posts)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async obterDetalhes (req, res) {
    try {
      let post

      if (req.user.cargo === 'admin') {
        post = await Post.buscaPorId(req.params.id)
      } else {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      res.json(post)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async remover (req, res) {
    try {
      let post

      if (req.user.cargo === 'admin') {
        post = await Post.buscaPorId(req.params.id)
      } else {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      if (post === null) {
        res.status(404)
        res.end()
      }

      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
}
