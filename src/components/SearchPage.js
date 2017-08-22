import React , { Component} from 'react'
import {PropTypes} from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import BookShelf from './BookShelf'


export default class SearchPage extends Component {

  static propTypes = {
    myBooks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    imageLinks: PropTypes.object.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired),
    id: PropTypes.string.isRequired
  })),
  onShelfChange: PropTypes.func.isRequired
}

  state = {
    books: [],
    query: ''
  }

  updateQuery = (event) => {
    this.setState({
      query: event.target.value.trim()
    })

    this.searchBooks(event.target.value.trim())
  }

  newArray = (arr,Arr) => {
  return arr.map((book)=>{Arr.forEach((Book)=>{
      if(Book.id === book.id){
        book.shelf = Book.shelf
        return
      }
    })
    return book
  })
}


  searchBooks = (value) => {
    if (value.length > 0) {
      BooksAPI.search(value).then((books) => {if(books.length>0)
        {
          books = books.filter((book)=>book.title)
          books = books.filter((book)=>book.authors)
          books = this.newArray(books,this.props.myBooks)
          this.setState({books})
        }
      })
    }
    else {
      this.setState({books:[], query: ''})
    }
  }


render() {
    const books = this.state.books
    const query = this.state.query

   return (
     <div>
         <div className="search-books">
           <div className="search-books-bar">
             <Link className="close-search" to="/">Close</Link>
             <div className="search-books-input-wrapper">
               <input
                 type="text"
                 placeholder="Search by title or author"
                 value={query}
                 onChange={this.updateQuery}
                />
             </div>
           </div>
           <div className="search-books-results">
             <ol className="books-grid">
             </ol>
           </div>
         </div>
         <div>
         {this.state.query !== '' && books.length > 0 &&
         (<BookShelf title="Search Results" books={books}
          onShelfChange={(id, shelf) => {
          this.props.onShelfChange(id, shelf)
        }}/>)}
        </div>
       </div>
       )
     }}
