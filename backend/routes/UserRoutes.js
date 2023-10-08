const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

  // users/
router.post('/', UserController.createUser);

// users/:id
router.post('/', UserController.validateUser);

module.exports = router;