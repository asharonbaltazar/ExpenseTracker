const express = require("express");
const colors = require("colors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Route definitions
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/transactions", require("./routes/transactions"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "client", "public", "index.html")
    );
  });
}

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Listening at ${PORT}`.yellow.bold));
