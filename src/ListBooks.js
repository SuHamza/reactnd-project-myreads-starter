import React from "react";
import ListBook from "./ListBook";
/** Component to list all Books */
const ListBooks = (props) => {
    // Get Book List from Props
    const books = props.books;
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
                        <ListBook book={book} updateShelf={props.updateShelf} />
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
                        <ListBook book={book} updateShelf={props.updateShelf} />
                    ))}
                </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Not Listed</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === "None" || !('shelf' in book))
                    .map((book) => (
                        <ListBook book={book} updateShelf={props.updateShelf} />
                    ))}
                </ol>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ListBooks