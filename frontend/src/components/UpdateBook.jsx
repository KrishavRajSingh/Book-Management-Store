import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateBook } from '../utils/api';

const UpdateBook = ({ book, token, setBooks, books }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setPrice(book.price);
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateBook(book._id, { title, author, publishYear, price }, token);
        setBooks(books.map((item)=>{
            if(item._id == book._id){
                return res.data;
            }
            return item;
        }))
    };

    return (
        <div>
            <h1>Update Book</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="number" placeholder="Publish Year" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

UpdateBook.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        publishYear: PropTypes.number,
        price: PropTypes.number,
        _id: PropTypes.string
    }),
    token: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        publishYear: PropTypes.number,
        price: PropTypes.number,
        _id: PropTypes.string
    })).isRequired,
    setBooks: PropTypes.func.isRequired
};

export default UpdateBook;
