import React from "react";
import "./searchBar.css";

export default function searchBar({ inputChangeHandler, page }) {
  return (
    <div className={page !== "Cart" ? "search-div" : "disable-div"}>
      <input
        type="search"
        className="search"
        placeholder="Search Your Fav. Book here"
        onChange={inputChangeHandler}
      />
    </div>
  );
}
