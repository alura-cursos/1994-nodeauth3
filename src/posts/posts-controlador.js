const Post = require('./posts-modelo')
const { InvalidArgumentError } = require('../erros')
const controle = require('../controle-de-acesso')

module.exports = {
  async adiciona (req, res) {
    try {
      const permissao = controle.can(req.user.cargo).createOwn('post')

      if (permissao.granted === false) {
        res.status(403)
        res.end()
        return
      }
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
      const podeLerQualquerPost = controle.can(req.user.cargo).readAny('post').granted
      const podeLerSeuPost = controle.can(req.user.cargo).readOwn('post').granted

      if (podeLerQualquerPost) {
        posts = await Post.listarTodos()
      }

      if (podeLerSeuPost) {
        posts = await Post.listarPorAutor(req.user.id)
      }

      if (!podeLerQualquerPost && !podeLerSeuPost) {
        res.status(403)
        res.end()
        return
      }

      res.json(posts)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async obterDetalhes (req, res) {
    try {
      let post
      const podeLerQualquerPost = controle.can(req.user.cargo).readAny('post').granted
      const podeLerSeuPost = controle.can(req.user.cargo).readOwn('post').granted

      if (podeLerQualquerPost) {
        post = await Post.buscaPorId(req.params.id)
      }

      if (podeLerSeuPost) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      if (!podeLerQualquerPost && !podeLerSeuPost) {
        res.status(403)
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
      const podeApagarQualquerPost = controle.can(req.user.cargo).deleteAny('post').granted
      const podeApagarSeuPost = controle.can(req.user.cargo).deleteOwn('post').granted

      if (podeApagarQualquerPost) {
        post = await Post.buscaPorId(req.params.id)
      }

      if (podeApagarSeuPost) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }

      if (!podeApagarQualquerPost && !podeApagarSeuPost) {
        res.status(403)
        res.end()
        return
      }

      if (controle.can(req.user.cargo).deleteAny('post').granted) {
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
