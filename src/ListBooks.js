import React from "react";
import ListBook from "./ListBook";
/** Component to list all Books */
const ListBooks = (props) => {
    // Get Book List from Props
    const books = props.books;
    const search = props.search;
    if (search) {
        const userBooks = props.userBooks;
        console.log('UserBooks:::', userBooks);
        // Check if result already listed to get its shelf
        books.map((res) => {
            // If book has no shelf key
            if (!('shelf' in res)) {
                // Set shelf to 'None'
                res.shelf = 'none';
            }
            // let idx = userBooks.indexOf(res.id);
            let found = userBooks.find(book => book.id === res.id);
            if (found) {
                // console.log('IDX::', found);
                res.shelf = found.shelf;
            } 
            // userBooks.some(book => book.id === res)
            return res;
        });

    }
    return (
       <div className="list-books-content">
            <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === "currentlyReading")
                    .map((book) => (
                        <ListBook book={book} updateShelf={props.updateShelf} />

                    ))}
                </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === "wantToRead")
                    .map((book) => (
                        <ListBook key={book.id} book={book} updateShelf={props.updateShelf} />
                    ))}
                </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === "read")
                    .map((book) => (
                        <ListBook key={book.id} book={book} updateShelf={props.updateShelf} />
                    ))}
                </ol>
                </div>
            </div>
            { /** Only display Not Listed Shelf in Search Results */
                search && (
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Not Listed</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === "none" || !('shelf' in book))
                        .map((book) => (
                            <ListBook key={book.id} book={book} updateShelf={props.updateShelf} />
                        ))}
                    </ol>
                    </div>
                    </div>
                )
            }
           
            </div>
        </div>
    )
}
export default ListBooks