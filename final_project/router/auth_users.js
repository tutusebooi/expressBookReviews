const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  let user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(403).json({ message: "Invalid login" });
  }

  let token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: "1h" });

  req.session.authorization = {
    accessToken: token,
    username: username
  };

  return res.status(200).json({ message: "Login successful", token });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req,res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;
  const review = req.query.review;

  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: "Review added/updated" });
});

regd_users.delete("/auth/review/:isbn", (req,res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted" });
  }

  return res.status(404).json({ message: "Review not found" });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
