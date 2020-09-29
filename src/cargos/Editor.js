const { entidades, acoes, cargos } = require('./permissoes')
const Cargo = require('./Cargo')

/**
 * Editor - definição das permissões de cada entidade para o Editor
 *
 * @implements {Cargo}
 */
class Editor extends Cargo {
  /**
   * constructor
   */
  constructor () {
    super()
    /**
     * @property {string} cargo - tem o cargo de editor
     */
    this.cargo = cargos.EDITOR

    /**
     * @property {string[]} USUARIOS - não tem permissões sobre nenhuma ação com os usuários
     */
    this[entidades.USUARIOS] = []

    /**
     * @property {string[]} POSTS - tem as permissões de ler, escrever, atualizar e remover posts que foram criados por si mesmo
     */
    this[entidades.POSTS] = [
      acoes.LER,
      acoes.ESCREVER,
      acoes.ATUALIZAR,
      acoes.REMOVER
    ]
  }
}

module.exports = Editor
