import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";

export default function Cart({ removeFromCart, cart }) {
  return (
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
}
