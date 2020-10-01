const { entidades, cargos, acoes } = require('./permissoes')

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
    this[entidades.POSTS] = [acoes.LER]
  }

  /**
   * obterCargo - retorna o cargo definido
   *
   * @return {string} LEITOR - cargo padrão
   */
  obterCargo () {
    return this.cargo
  }

  /**
   * obterPermissoesUsuarios - retorna as permissões definidas para os usuários
   *
   * @return {string[]} [] - nenhuma permissão é dada por padrão
   */
  obterPermissoesUsuarios () {
    return this[entidades.USUARIOS]
  }

  /**
   * obterPermissoesPosts - retorna as permissões definidas para os posts
   *
   * @return {string[]} [] - nenhuma permissão é dada por padrão
   */
  obterPermissoesPosts () {
    return this[entidades.POSTS]
  }
}

module.exports = Cargo
