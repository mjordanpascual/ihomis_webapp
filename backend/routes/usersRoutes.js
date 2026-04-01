const express = require('express');
const { registerUser, loginUser } = require('../controllers/usersController');

const router = express.Router();

// Register router
router.post('/register', registerUser);

router.post('/login', loginUser);

// Login router
// router.post('/login', loginUser);

module.exports = router;