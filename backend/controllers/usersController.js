const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register user
const registerUser = async (req, res) => {
    const { username,
            password,
            confirm_password,
            email,
            role,
            department } = req.body; 

    try { 
        // 1. Basic Validation - CHECK ALL FIELDS
        if (!username || !password || !confirm_password || !email) {
        return res.status(400).json({
                message: 'All fields are required'
        });
        }

        // 2. Basic Validation - USERNAME
        if(username.length < 4){
            return res.status(400).json({
                message: 'Username must be at least 4 characters'
        });
        }
        // 3. Basic Validation - PASSWORD
        if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters'
        });
        }

        // 4. Basic Validation - Password Match Validation
        if(password !== confirm_password){
            return res.status(400).json({
                message: 'Password and Confirm Password do not match'
            });
        }

        // ✅ 5. Check if USERNAME OR PASSWORD already exists
        const checkSql = `SELECT * FROM web_useraccount WHERE username = ? OR email = ?`;
        const [existingUser] = await db.execute(checkSql, [username, email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'Username or email already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const query = 'INSERT INTO web_useraccount ( username, password, email ) VALUES ( ?, ?, ?)';
        await db.execute(query, [username, hashedPassword, email]);

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
