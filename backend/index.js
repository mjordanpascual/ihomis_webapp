const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/database');
require('dotenv').config();
const patientsRoutes = require('./routes/patientsRoutes');
const helpcardRoutes = require('./routes/helpCardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const usersRoutes = require('./routes/usersRoutes');

const verifyToken = require('./middleware/verifyToken');
const isAdmin = require('./middleware/isAdmin');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

app.use('/', usersRoutes);
app.use('/api', patientsRoutes);
app.use('/helpcard', helpcardRoutes);

app.get('/api/admin', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

app.get('/api/admin', verifyToken, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome Admin',
    user: req.user,
    data: ['User List', 'Reports', 'System Settings']
  });
});

// app.get("/", (req, res) => {
//   res.send("API is working");
// });

app.get("/test", (req, res) => {
  res.send("OK");
});

app.get('/useraccount', async (req, res) => {
  try{
    const [rows, fields] = await db.query('SELECT user_name AS Username, user_pass AS Password FROM user_acc');
    res.status(200).json(rows);
  } catch(err){
    console.log(err);
    res.status(500).send('Server error');
  }
});

app.get('/departments', async (req, res) => {
  try{
    const [rows, fields] = await db.query('SELECT * FROM hdept h');
    res.status(200).json(rows);
  } catch(err){
    console.log(err);
    res.status(500).send('Server error');
  }
});

app.get('/users', async (req, res) => {
  try {
    // Execute the SQL query using await
    const [rows, fields] = await db.query('SELECT * FROM hpersonal WHERE lastname = "PASCUAL" ');
    
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
    const [rows, fields] = await db.query('SELECT COUNT(*) as "Total Patients: " FROM hperson;');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
