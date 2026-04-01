const express = require('express');
const { registerUser, loginUser } = require('../controllers/usersController');

const router = express.Router();

// Register router
router.post('/register', registerUser);

// Login router
router.post('/login', loginUser);

module.exports = router;