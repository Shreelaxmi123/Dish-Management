const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import cors package

const app = express();
const port = 3000;

// SQLite database connection
const db = new sqlite3.Database('./dishes.db');

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3003', // Allow requests from frontend running on this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Routes for CRUD operations
// GET all dishes
app.get('/api/dishes', (req, res) => {
    const sql = 'SELECT * FROM dishes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET a specific dish by dishId
app.get('/api/dishes/:dishId', (req, res) => {
    const { dishId } = req.params;
    const sql = 'SELECT * FROM dishes WHERE dishId = ?';
    db.get(sql, [dishId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }
        res.json(row);
    });
});

// POST a new dish
app.post('/api/dishes', (req, res) => {
    const { dishName, imageUrl, isPublished } = req.body;
    const sql = 'INSERT INTO dishes (dishName, imageUrl, isPublished) VALUES (?, ?, ?)';
    db.run(sql, [dishName, imageUrl, isPublished], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'New dish added', dishId: this.lastID });
    });
});

// PUT update a dish's information
app.put('/api/dishes/:dishId', (req, res) => {
    const { dishId } = req.params;
    const { dishName, imageUrl, isPublished } = req.body;
    const sql = 'UPDATE dishes SET dishName = ?, imageUrl = ?, isPublished = ? WHERE dishId = ?';
    db.run(sql, [dishName, imageUrl, isPublished, dishId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: `Updated dish ${dishId}` });
    });
});

// DELETE a dish by dishId
app.delete('/api/dishes/:dishId', (req, res) => {
    const { dishId } = req.params;
    const sql = 'DELETE FROM dishes WHERE dishId = ?';
    db.run(sql, [dishId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: `Deleted dish ${dishId}` });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
