const user = require('../models/User')


const createUser = async (req, res) => {
  const { username, email, password } = req.body

  await user.createUser({ username, email, password })
    .then((response) => {
      res.status(201).send({message: 'Usuario creado exitosamente'})
    })
    .catch((error) => {
      res.status(401).send({message: 'Error, datos invalidos'})
    })
}

const validateUser = async (req, res) => {
  const { email, password } = req.body
  await user.validateUser({ email, password })
    .then((response) => {
      res.status(201).send({message: 'Usuario validado'})
    })
    .catch((error) => {
      res.status(401).send({message: 'Error, datos invalidos'})
    })
}

module.exports = {
  createUser,
  validateUser
}
