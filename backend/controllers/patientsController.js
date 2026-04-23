const jwt = require('jsonwebtoken');
const db = require('../config/database');

const getPatients = async (req, res) => {
    try {
        const [patients] = await db.execute('SELECT * FROM hperson LIMIT 1000');
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};


module.exports = {
    getPatients,
    // createPatient,
};