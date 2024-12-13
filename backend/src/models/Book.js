const pool = require('../db');

// Ensure the Books table exists
const createBooksTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                publish_year INT NOT NULL CHECK (publish_year >= 0),
                price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                genre VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `;
        await pool.query(query);
        console.log('Books table ensured to exist.');
    } catch (error) {
        console.error('Error ensuring books table exists:', error.message);
    }
};

// Book Model
const BookModel = {
    // Get all books
    getAllBooks: async () => {
        try {
            const result = await pool.query('SELECT * FROM books');
            return result.rows;
        } catch (error) {
            console.error('Error fetching all books:', error.message);
            throw new Error('Failed to fetch books.');
        }
    },

    // Get book by ID
    getBookById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                throw new Error('Book not found.');
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching book by ID:', error.message);
            throw error;
        }
    },

    // Add a new book
    addBook: async (bookData) => {
        try {
            const { title, author, publishYear, price, genre } = bookData;
            const result = await pool.query(
                'INSERT INTO books (title, author, publish_year, price, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, author, publishYear, price, genre]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error adding new book:', error.message);
            throw new Error('Failed to add book.');
        }
    },

    // Update a book
    updateBook: async (id, updatedData) => {
        try {
            const { title, author, publishYear, price, genre } = updatedData;
            const result = await pool.query(
                'UPDATE books SET title = $1, author = $2, publish_year = $3, price = $4, genre = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
                [title, author, publishYear, price, genre, id]
            );
            if (result.rows.length === 0) {
                throw new Error('Book not found.');
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error updating book:', error.message);
            throw error;
        }
    },

    // Delete a book
    deleteBook: async (id) => {
        try {
            const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                throw new Error('Book not found.');
            }
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting book:', error.message);
            throw error;
        }
    }
};

// Export both the table creation utility and model
module.exports = {
    createBooksTable,
    BookModel
};
