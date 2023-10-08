const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const userModel = require('./models/User')
const Routes = require('./routes')
const PORT = 3000
require('dotenv').config()
//console.log(process.env)

const SECRET_KEY = process.env.SECRET_KEY

const server = express()
server.use(cors())

server.use(express.json())

//localhost:3000/auth
server.post('/api/v1/auth', async (req, res) => {
  const { email, password } = req.body

  const validatedUser = await userModel.validateUser(email, password)

  if (validatedUser) {
    const token = jwt.sign({ validatedUser }, SECRET_KEY, { expiresIn: '5m' })
    res.status(200).send({ token })
  } else {
    res.status(401).send({ message: 'Correo o contraseña incorrectos' })
  }

})

const validateToken = (req, res, next) => {
  const authHeader = req.get('authorization')

  if (authHeader) {
    // Bearer <token>
    const accessToken = authHeader.split(' ')[1]

    jwt.verify(accessToken, SECRET_KEY, (error, decode) => {
      if (error) {
        res.status(401).send({ message: 'Token no valido' })
      } else {
        next()
      }
    })
  } else {
    res.status(404).send({message: 'Petición incorrecta'})
  }
}

server.use('/api/v1/users', Routes.UserRoutes)
server.use('/api/v1/tasks', validateToken, Routes.TaskRoutes)

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conexión exitosa')
  } catch (error) {
    console.error(error)
  }
}

mongooseConnect()

server.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})