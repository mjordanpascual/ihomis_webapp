const express = require('express');
const { getPatients } = require('../controllers/patientsController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.get('/', getPatients);
// router.post('/', verifyToken, createPatient);
// router.get('/:id', verifyToken, getPatientById);
// router.put('/:id', verifyToken, updatePatient);
// router.delete('/:id', verifyToken, deletePatient);


//MySQL Query for testing
// router.get('/allpatients',  getAllpatients);

module.exports = router;