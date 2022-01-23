import React, {useState, useEffect} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';

/** Convert Classes to Functional Components
 * to be able to use Hooks
 */
const BooksApp = (props) => {
  // state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  //   showSearchPage: false
  // }
  
  const [showSearchPage, setShowSearchPage] = useState(false);
  // Initialize books State
  const [books, setBooks] = useState([]);
  
  // Use API to Fetch Remote Books
  // When Component Mounts
  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setBooks(books)
      })
  }, [books]);
  
  // Update Book Shelf
  const updateShelf = (shelf, book) => {
    book.shelf = shelf;
    console.log(book);
    // setBooks({...books, [book.id]: book});
    const newBooks = [...books];
    newBooks[newBooks.indexOf(book.id)] = book;
    setBooks(newBooks);
    BooksAPI.update(book, shelf)
      .then()
  }
 
  return (
      <div className="app">
        {showSearchPage ? (
          <SearchPage updateShelf={updateShelf} search={true} userBooks={books} setShowSearchPage={setShowSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {/* Books data should be fully loaded before listing books */
             books.length && (
              <ListBooks books={books} updateShelf={updateShelf} search={false} />
             )
            }
            
            <div className="open-search">
              <button onClick={() => setShowSearchPage({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default BooksApp
