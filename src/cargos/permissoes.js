/**
 * acoes - definição de quais ações podem ser executadas sobre cada entidade
 *
 * @property {Object} acoes - todas as entidades da aplicação
 * @property {Symbol} acoes.LER - ler, obter informações da entidade
 * @property {Symbol} acoes.ESCREVER - criar, inserir novas informações na tabela
 * @property {Symbol} acoes.ATUALIZAR - autalizar, mudar informações de um determinado documento
 * @property {Symbol} acoes.REMOVER - remover, apagar um determinado documento da aplicação
 */
const acoes = {
  LER: Symbol('ler'),
  ESCREVER: Symbol('escrever'),
  ATUALIZAR: Symbol('atualizar'),
  REMOVER: Symbol('remover')
}

/**
 * entidades - definição de quais entidades fazem parte da aplicação e do controle de acesso
 *
 * @property {Object} entidades - todas as entidades da aplicação
 * @property {Symbol} entidades.USUARIOS - usuários
 * @property {Symbol} entidades.POSTS - artigos/posts
 */
const entidades = {
  USUARIOS: Symbol('usuarios'),
  POSTS: Symbol('posts')
}

/**
 * cargos - definição de quais cargos a aplicação possui
 *
 * @property {Object} cargos - todos os cargos disponíveis
 * @property {Symbol} cargos.ADMIN - cargo de administrador
 * @property {Symbol} cargos.EDITOR - cargo de editor de posts
 * @property {Symbol} cargos.LEITOR - cargo de leitor de posts
 */
const cargos = {
  ADMIN: Symbol('admin'),
  EDITOR: Symbol('editor'),
  LEITOR: Symbol('leitor')
}

module.exports = {
  acoes,
  entidades,
  cargos
}
