import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import BooksComponent from "./components/Books";
import CartComponent from "./components/Cart";
import SearchBarComponent from "./components/searchBar/searchBar";

const PAGE_BOOKS = "Books";
const PAGE_CART = "Cart";

const App = () => {
  const [page, setPage] = useState(PAGE_BOOKS);
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentPage] = useState(1);
  const [booksPerPage] = useState(363);
  const [searchTerm, setSearchTerm] = useState("");
  const indexOfLastPost = currentPage * booksPerPage;
  const indexOfFirstPost = indexOfLastPost - booksPerPage;
  const currentBooks = books.slice(indexOfFirstPost, indexOfLastPost);

  const filteredBooks = currentBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const inputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo(PAGE_CART)}
          style={{ float: "Right", marginRight: "40px" }}
        >
          Cart({cart.length})
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo(PAGE_BOOKS)}
          style={{ float: "Right", marginRight: "40px" }}
        >
          Shop More Books
        </Button>
      </header>

      <SearchBarComponent
        inputChangeHandler={(e) => inputChangeHandler(e)}
        page={page}
      />

      {page === PAGE_BOOKS && (
        <BooksComponent books={filteredBooks} addToCart={addToCart} />
      )}
      {page === PAGE_CART && (
        <CartComponent cart={cart} removeFromCart={removeFromCart} />
      )}
    </div>
  );
};

export default App;
