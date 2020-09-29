const { entidades, acoes, cargos } = require('./permissoes')
const Cargo = require('./Cargo')

/**
 * Leitor - definição das permissões de cada entidade para o Leitor
 *
 * @implements {Cargo}
 */
class Leitor extends Cargo {
  /**
   * constructor
   */
  constructor () {
    super()
    /**
     * @property {string} cargo - tem o cargo de editor
     */
    this.cargo = cargos.LEITOR

    /**
     * @property {string[]} USUARIOS - não tem permissões sobre nenhuma ação com os usuários
     */
    this[entidades.USUARIOS] = []

    /**
     * @property {string[]} POSTS - tem a permissão de ler todos os posts
     */
    this[entidades.POSTS] = [acoes.LER]
  }
}

module.exports = Leitor
