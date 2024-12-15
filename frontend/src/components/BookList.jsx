import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../utils/api';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';

const BookList = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [addBook, setAddBook] = useState(false);
    const [updateBookId, setUpdateBookId] = useState(0);
    const [search, setSearch] = useState('');

    const genres = [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Science Fiction",
        "Fantasy",
        "Biography",
        "Self-Help",
        "Romance",
        "History",
        "All"
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            setBooks(response.data);
            setAllBooks(response.data);
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        await deleteBook(id, token);
        setBooks(books.filter(book => book.id !== id));
        setAllBooks(allBooks.filter(book => book.id !== id));
    };

    const filterByGenre = (genre) => {
        if(genre === "All")
            return setBooks(allBooks);
        setBooks(allBooks.filter(book => book.genre === genre)); // Filter from original list
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setBooks(allBooks.filter(book => book.title.toLowerCase().includes(e.target.value.toLowerCase()) || book.author.toLowerCase().includes(e.target.value.toLowerCase())));
    }

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
            <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: "center", marginBottom: "1rem"}}>
                <input type='text' onChange={handleSearch} placeholder='Search'></input>
                {token && <button onClick={() => setAddBook(!addBook)}>Add Book</button>}
            </div>
            {genres.map((genre, index) => <button style={{"margin": "0.2rem"}} onClick={() => filterByGenre(genre)} key={index}>{genre}</button>)}
            {addBook && <AddBook setAddBook={setAddBook} setBooks={setBooks} books={books} token={token}/>}
            <ul style={listStyle}>
                {books.map(book => (
                    <li key={book.id}>
                        <div key={book.id} style={{
        ...cardStyle, // Spread the existing cardStyle
        backgroundImage: `url('https://imgs.search.brave.com/adi2YamaMPWumXZUp1iRx1Re_xMo4WtmSbO0OKh6SPg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcz/NTY1OTU0L3Bob3Rv/L3ZpbnRhZ2UtYm9v/ay1kZWNvcmF0aW9u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1xeE1NVnpRWmdO/cnRRb3NOQjR1cDY2/TjlTcTdNdUhlZ242/eWJ3T1NoeGpjPQ')`,
        backgroundSize: 'cover', // Ensures the image covers the div
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents repeating the image
    }}>
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
