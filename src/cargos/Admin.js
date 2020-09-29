const { entidades, acoes, cargos } = require('./permissoes')
const Cargo = require('./Cargo')

/**
 * Admin - definição das permissões de cada entidade para o Admin
 *
 * @implements {Cargo}
 */
class Admin extends Cargo {
  /**
   * constructor
   */
  constructor () {
    super()
    /**
     * @type {string} cargo - tem o cargo de administrador
     */
    this.cargo = cargos.ADMIN

    /**
     * @type {string[]} USUARIOS - tem as permissões de ler, escrever, atualizar e remover usuários
     */
    this[entidades.USUARIOS] = [
      acoes.LER,
      acoes.ESCREVER,
      acoes.ATUALIZAR,
      acoes.REMOVER
    ]

    /**
     * @type {string[]} POSTS - tem as permissões de ler, escrever, atualizar e remover posts
     */
    this[entidades.POSTS] = [
      acoes.LER,
      acoes.ESCREVER,
      acoes.ATUALIZAR,
      acoes.REMOVER
    ]
  }
}

module.exports = Admin
