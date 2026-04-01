const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register user
const registerUser = async (req, res) => {
    const { username, password } = req.body; 

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const query = 'INSERT INTO web_useraccount ( username, password ) VALUES ( ?, ?)';
        await db.execute(query, [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};


// Login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const query = 'SELECT * FROM web_useraccount WHERE username = ?';
        const [rows] = await db.execute(query, [username]);

        if(rows.length === 0){
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = rows[0]

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({  error: 'Invalid credentials'});
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login sucessful', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }

};


module.exports = { registerUser, loginUser }
