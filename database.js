const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.sqlite')

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    emailVerificado INTEGER,
    cargo VARCHAR(15) CHECK (cargo in ('admin', 'editor', 'assinante')) NOT NULL
  )
  `

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    conteudo VARCHAR(140),
    autor INTEGER NOT NULL,
    FOREIGN KEY (autor) REFERENCES usuarios(id)
  )
  `

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON')
  db.run(USUARIOS_SCHEMA)
  db.run(POSTS_SCHEMA)
})

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0)
  })
)

module.exports = db
