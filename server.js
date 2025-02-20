const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const Buffer = require('buffer').Buffer;  // To handle binary data

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'login'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Multer setup for file uploads (ID card image)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store uploaded files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp
  }
});

const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to handle form submission
app.post('/api/register', upload.single('id-card'), (req, res) => {
  const { name, email, password, capturedImage } = req.body;
  const idCardPath = req.file ? req.file.path : null; // Store file path if ID card is uploaded

  if (!name || !email || !password || !capturedImage) {
    return res.status(400).send('All fields are required');
  }

  // Convert the base64 captured image to a binary buffer
  const imageBuffer = Buffer.from(capturedImage.split(',')[1], 'base64');

  // Insert user data into the database, including captured image and ID card
  const sql = 'INSERT INTO users (name, email, password, image, id_card) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, password, imageBuffer, idCardPath], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database insertion failed');
    }
    res.redirect('/home.html');
  });
});

// Route to fetch and display all users from the database
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Replace 'users' with your table name
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from database');
      return;
    }

    // Render the page with the results
    res.render('users', { users: results });
  });
});

// Serve the uploads folder as static content
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
