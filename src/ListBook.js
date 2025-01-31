import React from "react";

/** Component to list a single Book */
const ListBook = (props) => {
    // Get Required Book from Props
    const book = props.book;
    const updateShelf= props.updateShelf;
    const handleChange = (event) => {
        let shelf = event.target.value;
        updateShelf(shelf, book);
    }
    // // If book has no shelf key
    // if (!('shelf' in book)) {
    //     // Set shelf to 'None'
    //     book.shelf = 'none';
    // }
    // console.log('ListBook:::', book);
    return (
       <li key={book.id}>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={book.imageLinks && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                <select value={book.shelf} onChange={handleChange} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(' - ')}</div>
            </div>
        </li>

    )                    
}
export default ListBook