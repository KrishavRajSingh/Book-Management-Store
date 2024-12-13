import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateBook } from '../utils/api';

const UpdateBook = ({ book, token, setBooks, books }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState("");

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publish_year);
        setPrice(book.price);
        setGenre(book.genre)
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateBook(book.id, { title, author, publishYear, price, genre }, token);
        setBooks(books.map((item)=>{
            if(item.id == book.id){
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
                <input type="text"  placeholder='Genre' value={genre} onChange={(e) => setGenre(e.target.value)}/>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

UpdateBook.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        publish_year: PropTypes.number,
        price: PropTypes.number,
        genre: PropTypes.string,
        id: PropTypes.number
    }),
    token: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        publish_year: PropTypes.number,
        price: PropTypes.number,
        genre: PropTypes.genre,
        id: PropTypes.number
    })).isRequired,
    setBooks: PropTypes.func.isRequired
};

export default UpdateBook;
