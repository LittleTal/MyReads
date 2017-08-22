import React from 'react'
import { PropTypes } from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {
    const books = props.books
    return(
       <div className="bookshelf">
         <h2 className="bookshelf-title">{props.title}</h2>
         <div className="bookshelf-books">
           <ol className="books-grid">
             {books.map((book,index) => (
               <Book
                 imageURL={book.imageLinks}
                 title={book.title}
                 author={book.authors}
                 key={''.concat(book.id,index)}
                 shelf={book.shelf}
                 onShelfChange={(shelf) => {props.onShelfChange(book.id,shelf)
                 }}
               />
             ))}
          </ol>
        </div>
      </div>
    )
  }

BookShelf.propTypes={
 title: PropTypes.string.isRequired,
 books: PropTypes.array,
 onShelfChange: PropTypes.func.isRequired
}

  export default BookShelf;
