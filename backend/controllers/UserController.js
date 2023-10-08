const user = require('../models/User')


const createUser = async (req, res) => {
  const { username, email, password } = req.body

  await user.createUser({ username, email, password })
    .then((response) => {
      res.status(201).send({message: 'Usuario creado exitosamente'})
    })
    .catch((error) => {
      const errorMessage = `Error: ${error.message}`;
      res.status(401).send({message: errorMessage})
    })
}

module.exports = {
  createUser
}
