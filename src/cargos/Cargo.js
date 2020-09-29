const { entidades, cargos } = require('./permissoes')

/**
 * Cargo - definição base dos cargos da aplicação
 *
 * @interface
 */
class Cargo {
  /**
   * constructor
   */
  constructor () {
    /**
     * @property {string} [cargo=LEITOR] - título do cargo
     */
    this.cargo = cargos.LEITOR

    /**
     * @property {string[]} USUARIOS - as possíveis permissões que o cargo pode ter em relação aos usuários
     */
    this[entidades.USUARIOS] = []

    /**
     * @property {string[]} POSTS - as possíveis permissões que o cargo pode ter em relação aos usuários
     */
    this[entidades.POSTS] = []
  }
}

module.exports = Cargo
