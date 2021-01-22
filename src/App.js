import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Grid, Paper, Button } from "@material-ui/core";

const PAGE_BOOKS = "Books";
const PAGE_CART = "Cart";

const App = () => {
  const [page, setPage] = useState(PAGE_BOOKS);
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
      )
      .then((res) => {
        console.log("response from URl : ", res.data[0]);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("Error Whle getting Data : ", err);
      });
  }, []);

  const addToCart = (book) => {
    console.log("added to the cart");
    setCart([...cart, { ...book }]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const removeFromCart = (bookToRemove) => {
    setCart(cart.filter((book) => book !== bookToRemove));
  };

  const renderBooks = () => (
    <>
      <h1>Books you Would Like to Read</h1>
      <Grid container justify="center" spacing={2}>
        {books.map((book) => (
          <Grid key={book.bookID} item md="4">
            <Paper elevation={3} className="paper-div">
              <h3>{book.title}</h3>
              <h4>${book.price}</h4>
              <h4>Lang : {book.language_code}</h4>
              <h4>Rating : {book.average_rating}</h4>
              <Button variant="contained" onClick={() => addToCart(book)}>
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderCart = () => (
    <>
      <h1>Your Choice is Awesome!!!!</h1>
      <Grid container justify="center" spacing={2}>
        {cart.map((book) => (
          <Grid key={book.bookID} item md="4">
            <Paper elevation={3} className="paper-div">
              <h3>{book.title}</h3>
              <h4>${book.price}</h4>
              <h4>Lang : {book.language_code}</h4>
              <h4>Rating : {book.average_rating}</h4>
              <Button variant="contained" onClick={() => removeFromCart(book)}>
                Remove
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <div className="App">
      <header>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo(PAGE_CART)}
        >
          Cart({cart.length})
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo(PAGE_BOOKS)}
        >
          See Books
        </Button>
      </header>

      {page === PAGE_BOOKS && renderBooks()}
      {page === PAGE_CART && renderCart()}
    </div>
  );
};

export default App;
