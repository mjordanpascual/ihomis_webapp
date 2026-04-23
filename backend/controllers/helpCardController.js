const db = require('../config/database');

const getPatients = async (req, res) => {
    try{
        const [patients] = await db.execute('SELECT * FROM hperson LIMIT 1000');
        res.json(patients);
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch patients data' });
    }
};

module.exports = { getPatients }