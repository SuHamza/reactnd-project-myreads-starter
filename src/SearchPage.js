import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';
import ListBooks from "./ListBooks";

const SearchPage = (props) => {
    const userBooks = props.userBooks;
   
    // Initialize Search Query State
  const [query, setQuery] = useState('');
  // Initialize Search Result State
  const [searchResult, setSearchResult] = useState([]);

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
        <div className="search-books">
            <div className="search-books-bar">
              {/* <button className="close-search" onClick={() => props.setShowSearchPage({ showSearchPage: false })}>Close</button> */}
              <Link
                to='/' 
                className="close-search"
              ></Link>
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
                searchResult.length &&
                (
                    <ListBooks books={searchResult} updateShelf={props.updateShelf} search={true} userBooks={userBooks} />
                )
              }
            </div>
          </div>
    )
}

export default SearchPage