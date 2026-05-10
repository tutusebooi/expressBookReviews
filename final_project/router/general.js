const express = require('express');
const axios = require('axios');

let router = express.Router();

const booksAPI = "http://localhost:5000/";

// Get all books using async callback function
router.get('/', async function (req, res) {

    try {
        const response = await axios.get(booksAPI);

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});


// Get book details based on ISBN using async callback function
router.get('/isbn/:isbn', async function (req, res) {

    const isbn = req.params.isbn;

    try {

        const response = await axios.get(booksAPI);

        const books = response.data;

        const book = books[isbn];

        if (book) {

            return res.status(200).json(book);

        } else {

            return res.status(404).json({
                message: "Book not found"
            });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Error fetching book"
        });
    }
});


// Get book details based on author using async callback function
router.get('/author/:author', async function (req, res) {

    const author = req.params.author.toLowerCase();

    try {

        const response = await axios.get(booksAPI);

        const books = Object.values(response.data);

        const filteredBooks = books.filter(
            (book) => book.author.toLowerCase() === author
        );

        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);

        } else {

            return res.status(404).json({
                message: "Author not found"
            });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});


// Get book details based on title using async callback function
router.get('/title/:title', async function (req, res) {

    const title = req.params.title.toLowerCase();

    try {

        const response = await axios.get(booksAPI);

        const books = Object.values(response.data);

        const filteredBooks = books.filter(
            (book) => book.title.toLowerCase() === title
        );

        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);

        } else {

            return res.status(404).json({
                message: "Title not found"
            });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});

module.exports.general = router;