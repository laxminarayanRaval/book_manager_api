const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Book Manager API",
    version: "1.0.0",
    description: "API documentation for Book Manager",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../routes/*.js")], // Path to the API route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Export Swagger UI setup
module.exports = {
  swaggerUi,
  swaggerSpec,
};
