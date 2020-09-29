module.exports = (cargoObrigatorio = 'admin') => (req, res, proximo) => {
  const cargoAtual = req.user.cargo

  if (cargoAtual !== cargoObrigatorio) {
    res.status(403)
    res.end()
  } else {
    proximo()
  }
}
