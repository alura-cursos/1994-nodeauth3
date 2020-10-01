const Post = require('./posts-modelo')
const { InvalidArgumentError } = require('../erros')
const controle = require('../controle-de-acesso')

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
      const posts = await Post.listarTodos()
      res.json(posts)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async obterDetalhes (req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id)

      if (post === null) {
        res.status(404)
        res.end()
        return
      }

      res.json(post)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async remover (req, res) {
    try {
      let post

      if (req.acesso.todos) {
        post = await Post.buscaPorId(req.params.id)
      }

      if (req.acesso.todos) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      if (post === null) {
        res.status(404)
        res.end()
        return
      }

      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
}
