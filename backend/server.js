// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
      console.error('Error opening database', err.message);
  } else {
      console.log('Connected to the SQLite database');
  }
});

let users=[];

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

  const stmt = db.prepare("INSERT INTO users (username,password) VALUES (?,?)");
  stmt.run("admin","admin");
  stmt.run("prasanna","prasanna");
  stmt.finalize();

  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
        console.error('Error fetching users:', err.message);
        return;
    }
    users = rows;
});
});

// Dummy user data
const userlist = [
  { username: 'admin', password: 'admin' },
  { username: 'prasanna', password: 'prasanna' }
];

//list of users route
app.get('/users', (req, res) => {
      res.json(users);
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});