import React, {useState, useEffect} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';

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
  // Initialize Search Query State
  const [query, setQuery] = useState('');
  // Initialize Search Result State
  const [searchResult, setSearchResult] = useState([]);
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
    setBooks({...books, [book.id]: book});
    BooksAPI.update(book, shelf)
      .then()
  }
 
  // Update Search Query
  const updateQuery = (query) => {
    // setQuery(query.trim());
    if (query !== '')
    {
      BooksAPI.search(query)
        .then((res) => {
        setSearchResult(res)
      })
      
    }
    console.log('Search Result::: ', searchResult);
    
  }

  useEffect(() => {
    let isMounted = true;
    if(isMounted)
    {
      updateQuery(query);
    }
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [query]);

  
    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => setShowSearchPage({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => setQuery(event.target.value.trim())}
                />

              </div>
            </div>
            <div className="search-books-results">
              {/* Search Result should be fully loaded before listing books */
                !searchResult.length ?
                <div>No Results!</div>
                :
                // <div>Result: {searchResult.length}</div>
                <ListBooks books={searchResult} updateShelf={updateShelf} search={true} userBooks={books} />
              }
            </div>
          </div>
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
