import { createContext, useState } from 'react';
import axios from 'axios';

// Create Context object
const BooksContext = createContext();

// Create a provider (wrapper around context object)
function Provider({ children }) {

    const [books, setBooks] = useState([]);

    // Fetch all books
    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }

    // Edit a book by id
    const editBookById = async (id, newTitle) => {
        const resposne = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

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

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        fetchBooks,
        createBook
        
    };


    return <BooksContext.Provider value = {valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { Provider };

export default BooksContext;