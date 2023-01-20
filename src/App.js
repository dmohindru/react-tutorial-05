import axios from 'axios';
import {useState, useEffect} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {

    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }

    // This function is always when App component is rendered first time.
    useEffect(() => {
        fetchBooks();
    }, []);

    // Edit a book by id
    const editBookById = async (id, newTitle) => {
        const resposne = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        console.log(resposne);

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, ...resposne.data};
            }
            return book;
        });

        setBooks(updatedBooks);
    };

    // Delete a book by id
    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    }

    // Create book handler function
    const createBook = async (title) => {

        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        
        const updatedBooks = [
            ...books,
            response.data
        ];

        setBooks(updatedBooks);
    }

    return (
    <div className='app'>
        <h1>Reading List</h1>
        <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
        <BookCreate onCreate={createBook}  /> 
    </div>
    );
}

export default App;
