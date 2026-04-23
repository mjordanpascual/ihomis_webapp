const express = require('express');
const { getPatients } = require('../controllers/helpCardController');
const  verifyToken  = require('../middleware/verifyToken');

const router = express.Router();

router.get('/patients', verifyToken, getPatients);

module.exports = router;