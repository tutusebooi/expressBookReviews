const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");

const public_users = express.Router();

/*
  Get the list of all books
*/
public_users.get('/', async function (req, res) {

    try {

        // Retrieve all books using Axios
        const response = await axios.get('http://localhost:5000/');

        // Return all books
        return res.status(200).json(response.data);

    } catch (error) {

        // Handle server errors
        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

/*
  Get book details using ISBN
*/
public_users.get('/isbn/:isbn', async function (req, res) {

    const isbn = req.params.isbn;

    try {

        // Fetch all books from API
        const response = await axios.get('http://localhost:5000/');

        const booksData = response.data;

        // Check if requested ISBN exists
        if (booksData[isbn]) {

            return res.status(200).json(booksData[isbn]);
        }

        // Return message if book does not exist
        return res.status(404).json({
            message: "Book not found"
        });

    } catch (error) {

        // Handle request errors
        return res.status(500).json({
            message: "Error retrieving book"
        });
    }
});

/*
  Get books using author name
*/
public_users.get('/author/:author', async function (req, res) {

    const author = req.params.author.toLowerCase();

    try {

        // Fetch books from API
        const response = await axios.get('http://localhost:5000/');

        // Convert object into array
        const booksData = Object.values(response.data);

        // Filter books matching author name
        const filteredBooks = booksData.filter(
            (book) => book.author.toLowerCase() === author
        );

        // Return matching books
        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);
        }

        // Return message if author not found
        return res.status(404).json({
            message: "Author not found"
        });

    } catch (error) {

        // Handle server errors
        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

/*
  Get books using title
*/
public_users.get('/title/:title', async function (req, res) {

    const title = req.params.title.toLowerCase();

    try {

        // Fetch books from API
        const response = await axios.get('http://localhost:5000/');

        // Convert object into array
        const booksData = Object.values(response.data);

        // Filter books matching title
        const filteredBooks = booksData.filter(
            (book) => book.title.toLowerCase() === title
        );

        // Return matching books
        if (filteredBooks.length > 0) {

            return res.status(200).json(filteredBooks);
        }

        // Return message if title not found
        return res.status(404).json({
            message: "Title not found"
        });

    } catch (error) {

        // Handle server errors
        return res.status(500).json({
            message: "Error retrieving books"
        });
    }
});

module.exports.general = public_users;