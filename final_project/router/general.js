const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");

const public_users = express.Router();

/*
Task 1
Get the book list available in the shop
*/
public_users.get('/', async function (req, res) {

    try {

        const response = await axios.get('http://localhost:5000/');

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

/*
Task 2
Get book details based on ISBN
*/
public_users.get('/isbn/:isbn', async function (req, res) {

    const isbn = req.params.isbn;

    try {

        const response = await axios.get('http://localhost:5000/');

        const booksData = response.data;

        if (booksData[isbn]) {

            return res.status(200).json(booksData[isbn]);
        }

        return res.status(404).json({
            message: "Book not found"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error retrieving book"
        });
    }
});

/*
Task 3
Get book details based on author
*/
public_users.get('/author/:author', async function (req, res) {

    const author = req.params.author.toLowerCase();

    try {

        const response = await axios.get('http://localhost:5000/');

        const booksData = Object.values(response.data);

        const filteredBooks = booksData.filter(
            (book) => book.author.toLowerCase() === author
        );

        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);
        }

        return res.status(404).json({
            message: "Author not found"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

/*
Task 4
Get book details based on title
*/
public_users.get('/title/:title', async function (req, res) {

    const title = req.params.title.toLowerCase();

    try {

        const response = await axios.get('http://localhost:5000/');

        const booksData = Object.values(response.data);

        const filteredBooks = booksData.filter(
            (book) => book.title.toLowerCase() === title
        );

        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);
        }

        return res.status(404).json({
            message: "Title not found"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

module.exports.general = public_users;