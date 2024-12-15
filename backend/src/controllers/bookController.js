const pool = require('../db'); // PostgreSQL pool instance

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const { title, author, publishYear, price, genre } = req.body;
        
        const result = await pool.query(
            'INSERT INTO books (title, author, publish_year, price, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, publishYear, price, genre]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID', error: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { title, author, publishYear, price, genre } = req.body;
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, publish_year = $3, price = $4, genre = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
            [title, author, publishYear, price, genre, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data or ID', error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', book: result.rows[0] });
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID', error: error.message });
    }
};
