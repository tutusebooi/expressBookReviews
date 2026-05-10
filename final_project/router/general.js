const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");

const public_users = express.Router();

public_users.get('/', function (req, res) {
    return res.status(300).json(books);
});

// Get book by ISBN using Axios
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        if (booksData[isbn]) {
            return res.status(200).json(booksData[isbn]);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book" });
    }
});

// Get books by author using Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        const filteredBooks = Object.values(booksData).filter(
            (book) => book.author.toLowerCase() === author.toLowerCase()
        );

        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

// Get books by title using Axios
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        const filteredBooks = Object.values(booksData).filter(
            (book) => book.title.toLowerCase() === title.toLowerCase()
        );

        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

module.exports.general = public_users;