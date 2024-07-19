import { useState } from 'react';
import { addBook } from '../utils/api';
import PropTypes from 'prop-types';

const AddBook = ({ setAddBook, token, setBooks, books }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addBook({ title, author, publishYear, price }, token);
        setTitle('');
        setAuthor('');
        setPublishYear('');
        setPrice('');
        setBooks([...books, res.data])
        setAddBook(false);
    };
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '300px',
    };
    const listStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    };
    
    return (
        <div style={listStyle}>
            {/* <h1>Add Book</h1> */}
            <form onSubmit={handleSubmit} style={cardStyle}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="number" placeholder="Publish Year" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <br />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

AddBook.propTypes = {
    setAddBook: PropTypes.func.isRequired,
    token: PropTypes.string,
    setBooks: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        publishYear: PropTypes.number,
        price: PropTypes.number,
        _id: PropTypes.string
    })).isRequired,
}

export default AddBook;
