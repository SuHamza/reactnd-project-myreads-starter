import React from "react";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";

const Home = (props) => {
    const {books, updateShelf} = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {/* Books data should be fully loaded before listing books */
             books.length && (
              <ListBooks books={books} updateShelf={updateShelf} search={false} />
             )
            }
            
            <Link
              to= '/search'
              className='open-search'
            >Add a book</Link>
          </div>
    )
}

export default Home