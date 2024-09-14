const Book = require("../models/Book");

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isDeleted: false }).sort("-createdAt");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book || book.isDeleted)
      return res.status(404).json({ message: "Book Not Found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author } = req.body;

  try {
    const newBook = await Book.create({ title, author });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Error Adding Book" });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!book || book.isDeleted)
      return res.status(404).json({ message: "Book Not Found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Soft delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book Not Found" });
    res.json({ message: "Book Deleted", book });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
