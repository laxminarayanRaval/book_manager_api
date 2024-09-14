const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const generateFakeData = require("./utils/generateFakeData");
const logger = require("./utils/logger");

dotenv.config();
connectDB();

const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this if your frontend is running on a different port
  })
);

app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

if (process.env.GENERATE_FAKE_DATA === "true") {
  generateFakeData();
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
