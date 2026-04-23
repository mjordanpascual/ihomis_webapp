const express = require('express');
const { registerUser, loginUser, getAllpatients } = require('../controllers/usersController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Register router
router.post('/register', registerUser);

// Login router
router.post('/login',  loginUser, isAdmin);

module.exports = router;