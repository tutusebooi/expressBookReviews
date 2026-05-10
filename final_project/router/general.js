const express = require('express');
let router = express.Router();

let books = require("./booksdb.js");

// Get all books using Promise
router.get('/', function (req, res) {

    const getBooks = new Promise((resolve, reject) => {

        if (books) {
            resolve(books);
        } else {
            reject("Books not found");
        }
    });

    getBooks.then((data) => {
        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(500).json({
            message: error
        });
    });
});


// Get book by ISBN using Promise
router.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    const getBook = new Promise((resolve, reject) => {

        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });

    getBook.then((data) => {
        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(404).json({
            message: error
        });
    });
});


// Get books by Author using Promise
router.get('/author/:author', function (req, res) {

    const author = req.params.author.toLowerCase();

    const getBooksByAuthor = new Promise((resolve, reject) => {

        const filteredBooks = Object.values(books).filter(
            (book) => book.author.toLowerCase() === author
        );

        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("Author not found");
        }
    });

    getBooksByAuthor.then((data) => {
        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(404).json({
            message: error
        });
    });
});


// Get books by Title using Promise
router.get('/title/:title', function (req, res) {

    const title = req.params.title.toLowerCase();

    const getBooksByTitle = new Promise((resolve, reject) => {

        const filteredBooks = Object.values(books).filter(
            (book) => book.title.toLowerCase() === title
        );

        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("Title not found");
        }
    });

    getBooksByTitle.then((data) => {
        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(404).json({
            message: error
        });
    });
});

module.exports.general = router;