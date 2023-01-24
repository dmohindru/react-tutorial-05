import {useEffect, useContext} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books'

function App() {

    const { fetchBooks } = useContext(BooksContext);

    // This function is always when App component is rendered first time.
    useEffect(() => {
        fetchBooks();
    }, []);

    

    return (
    <div className='app'>
        <h1>Reading List</h1>
        <BookList />
        <BookCreate /> 
    </div>
    );
}

export default App;
