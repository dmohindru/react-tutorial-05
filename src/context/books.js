import { createContext, useState } from 'react';

// Create Context object
const BooksContext = createContext();

// Create a provider (wrapper around context object)
function Provider({ children }) {
    const [count, setCount] = useState(5);

    const valueToShare = {
        count,
        incrementCount: () => {
            setCount(count + 1);
        }
    };

    return <BooksContext.Provider value = {valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { Provider };

export default BooksContext;