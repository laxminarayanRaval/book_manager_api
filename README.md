# Book Management API

## Overview

This backend API is designed for a book management application. It includes endpoints for CRUD operations on books and user authentication using JWT. The API is built with Node.js, Express, and MongoDB.

## Features

- **CRUD Operations** for books
- **User Authentication** using JWT
- **Error Handling** and **Validation**

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.2 or higher)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:laxminarayanRaval/book_manager_api.git
   cd book_manager_api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bookmanagement
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

- **`POST /api/auth/login`**: Authenticate a user and return a JWT token.

  **Request:**

  ```json
  {
    "email": "test@test.com",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Books

- **`GET /api/books`**: Get a list of all books.

  **Response:**

  ```json
  [
    {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description"
    }
  ]
  ```

- **`POST /api/books`**: Add a new book.

  **Request:**

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book description"
  }
  ```

  **Response:**

  ```json
  {
    "id": "new_book_id",
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book description"
  }
  ```

- **`GET /api/books/:id`**: Get details of a single book.

  **Response:**

  ```json
  {
    "id": "book_id",
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book description"
  }
  ```

- **`PUT /api/books/:id`**: Update a book.

  **Request:**

  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "description": "Updated book description"
  }
  ```

  **Response:**

  ```json
  {
    "id": "book_id",
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "description": "Updated book description"
  }
  ```

- **`DELETE /api/books/:id`**: Delete a book.

  **Response:**

  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

## Development

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! Please create an issue or submit a pull request to contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
