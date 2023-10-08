const mongoose = require('mongoose')

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}

const User = mongoose.model('User', userSchema)

const createUser = async (user) => {
  return await User.create(user)
}

const validateUser = async (email, password) => {
  const user = await User.find({email})

  if(user.password === password){
    return {
      email: user.email,
      name: user.name
    }
  } else {
    return null
  }

}

module.exports = {
  createUser,
  validateUser
}
