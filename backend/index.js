const express = require('express');
const pool = require('./config/database')
require('dotenv').config();

const cors = require('cors');

const db = require('./config/database')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log('✅ MySQL connected');
        conn.release();
    } catch (error) {
        console.error('❌ DB connection failed:', error.message);
        process.exit(1);
    }
}) ();

app.get('/', async (req, res) => {
  try{
    const [rows, fields] = await db.query('SELECT COUNT(*) AS Total FROM hperson');
    res.status(200).json(rows);
  } catch(err){
    console.log(err);
    res.status(500).send('Server error');
  }
});

app.get('/users', async (req, res) => {
  try {
    // Execute the SQL query using await
    //const [rows, fields] = await db.query('SELECT * FROM hpersonal WHERE lastname = "PASCUAL" ');
    const [rows, fields] = await db.query('SELECT COUNT(*)as Total FROM hperson;');

    // Send the fetched data as a JSON response
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/erlog', async (req, res) => {
  try {
    //const [rows, fields] = await db.query('SELECT  * FROM hperson');
    const [rows, fields] = await db.query('SELECT  * FROM hperson');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});







// const express = require('express');
// const app = express();
// const PORT = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
