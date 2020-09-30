/**
 * acoes - definição de quais ações podem ser executadas sobre cada entidade
 *
 * @property {Object} acoes - todas as entidades da aplicação
 * @property {string} acoes.LER - ler, obter informações da entidade
 * @property {string} acoes.ESCREVER - criar, inserir novas informações na tabela
 * @property {string} acoes.ATUALIZAR - autalizar, mudar informações de um determinado documento
 * @property {string} acoes.REMOVER - remover, apagar um determinado documento da aplicação
 */
const acoes = {
  LER: 'ler',
  ESCREVER: 'escrever',
  ATUALIZAR: 'atualizar',
  REMOVER: 'remover'
}

/**
 * entidades - definição de quais entidades fazem parte da aplicação e do controle de acesso
 *
 * @property {Object} entidades - todas as entidades da aplicação
 * @property {string} entidades.USUARIOS - usuários
 * @property {string} entidades.POSTS - artigos/posts
 */
const entidades = {
  USUARIOS: 'usuarios',
  POSTS: 'posts'
}

/**
 * cargos - definição de quais cargos a aplicação possui
 *
 * @property {Object} cargos - todos os cargos disponíveis
 * @property {string} cargos.ADMIN - cargo de administrador
 * @property {string} cargos.EDITOR - cargo de editor de posts
 * @property {string} cargos.LEITOR - cargo de leitor de posts
 */
const cargos = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  LEITOR: 'leitor'
}

module.exports = {
  acoes,
  entidades,
  cargos
}
