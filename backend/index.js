const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./config/database')
require('dotenv').config();

const cors = require('cors');

const db = require('./config/database')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173", // React Vite default
//   credentials: true
// }));
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

app.get("/create-user", async (req, res) => {
  const bcrypt = require("bcrypt");

  const hashedPassword = await bcrypt.hash("123456", 10);

  db.query(
    "INSERT INTO web_useraccount (username, password) VALUES (?, ?)",
    ["admin", hashedPassword],
    (err, result) => {
      if (err) return res.send(err);
      res.send("User created");
    }
  );
});

// app.get('/', async (req, res) => {
//   try{
//     const [rows, fields] = await db.query('SELECT COUNT(*) AS Total FROM hperson');
//     res.status(200).json(rows);
//   } catch(err){
//     console.log(err);
//     res.status(500).send('Server error');
//   }
// });

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/test", (req, res) => {
  res.send("OK");
});

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT username, password FROM web_useraccount WHERE username = ?";
//   db.query(sql, [username], async(err, result) => {
//     if(err) return res.status(500).json(err);

//     if(result.length === 0) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const user = result[0];

//     const match = await bcrypt.compare(password, user.password);
//     // const match = await bcrypt.compare(password, user.password);
//     // const match = password === user.password;

//     if(!match) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       "SECRET KEY",
//       { expiresIn: "1h" }
//     );


//     res.json({
//       message: "Login Succesful",
//       token,
//       user: {
//         id: user.id,
//         username: user.username
//       }
//     });
//     // res.status(200).send('Login Succesful');
    
//   });
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     console.log("LOGIN HIT"); // 👈 VERY IMPORTANT
//     console.log("BODY:", req.body); // DEBUG

//     const sql = "SELECT * FROM web_useraccount WHERE username = ?";
    
//     db.query(sql, [username], async (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       }

//       if (result.length === 0) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       const user = result[0];

//       const match = await bcrypt.compare(password, user.password);

//       if (!match) {
//         return res.status(401).json({ message: "Invalid password" });
//       }

//       return res.json({ message: "Login success" });
//     });

//   } catch (error) {
//     console.log("SERVER ERROR:", error);
//     res.status(500).json({ message: "Server crashed" });
//   }
// });

app.post('/login', (req, res) => {
  console.log("LOGIN HIT");
  console.log("BODY:", req.body);

  const { username, password } = req.body;

  const sql = "SELECT * FROM web_useraccount WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }

    if (!result || result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    try {
      const user = result[0];

      console.log("DB PASSWORD:", user.password);

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.json({ message: "Login OK" });

    } catch (error) {
      console.log("COMPARE ERROR:", error);
      return res.status(500).json({ message: "Crash in compare" });
    }
  });
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
    const [rows, fields] = await db.query('SELECT  * FROM hperson');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
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
