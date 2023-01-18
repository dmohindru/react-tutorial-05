import axios from 'axios';
import {useState} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {

    const [books, setBooks] = useState([]);

    // Edit a book by id
    const editBookById = (id, newTitle) => {
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, title: newTitle};
            }
            return book;
        });

        setBooks(updatedBooks);
    };

    // Delete a book by id
    const deleteBookById = (id) => {
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
