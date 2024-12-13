import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../utils/api';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [addBook, setAddBook] = useState(false);
    const [updateBookId, setUpdateBookId] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        await deleteBook(id, token);
        setBooks(books.filter(book => book.id !== id));
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '300px',
    };

    const buttonStyle = {
        marginLeft: '8px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const listStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    };
    const token = localStorage.getItem('token');

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <h2>Book List</h2>
                {token && <button onClick={() => setAddBook(!addBook)}>Add Book</button>}
            </div>
            {addBook && <AddBook setAddBook={setAddBook} setBooks={setBooks} books={books} token={token}/>}
            <ul style={listStyle}>
                {books.map(book => (
                    <li key={book.id}>
                        <div key={book.id} style={cardStyle}>
                            <h2>{book.title}</h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Price:</strong> ₹{book.price}</p>
                            <p><strong>Publish Year:</strong> {book.publish_year}</p>
                            {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
                            {token && <>
                                <button onClick={() => setUpdateBookId(updateBookId!==book.id?book.id:0)}>Update</button>
                                <button style={buttonStyle} onClick={() => handleDelete(book.id)}>Delete</button>
                            </>}
                            {updateBookId === book.id && <UpdateBook setBooks={setBooks} books={books} book={book} token={token}/>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
