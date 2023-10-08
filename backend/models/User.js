const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  },
});

// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10); // Hash con salt
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

const createUser = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      throw new Error('El nombre de usuario ya está en uso.');
    } else if (error.code === 11000 && error.keyPattern.email) {
      throw new Error('El correo electrónico ya está en uso.');
    } else {
      throw error;
    }
  }
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log("test")
    return null;
  }
  console.log(user.password)
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    return {
      email: user.email,
      username: user.username // Agrega el nombre de usuario si lo necesitas
    };
  } else {
    return null;
  }
};

module.exports = {
  createUser,
  validateUser,
};
