const express = require("express");
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect } = require("../middlewares/authMiddleware");
const {
  validateBookInput,
  validate,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

// Routes for books
router
  .route("/")
  .get(getBooks)
  .post(protect, validateBookInput, validate, addBook);
router
  .route("/:id")
  .get(getBookById)
  .put(protect, validateBookInput, validate, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
