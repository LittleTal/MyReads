import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchPage from './components/SearchPage'
import BookList from './components/BookList'

export default class App extends Component {
  state ={
    books: []
  }

  componentDidMount(){
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({books}))
  }

  changeShelf = (id,shelf) => {
    BooksAPI.update({id},shelf).then(() => {this.getBooks()
  })
  }

  render(){
    return(
          <div className="app">

                <Route exact path="/" render={() => (

                  <BookList books={this.state.books}
                  onShelfChange={(id,shelf) => this.changeShelf(id,shelf)} />

                  )}/>


                  <Route exact path="/search" component={() => (

                    <SearchPage
                      myBooks={this.state.books}
                      onShelfChange={(id,shelf) => {this.changeShelf(id,shelf)}}/>

                  )}/>

      </div>
    )
  }
}
