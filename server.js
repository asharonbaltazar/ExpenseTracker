const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

connectDB();

const transactions = require("./routes/transactions");

app.use("/transactions", transactions);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Listening at ${PORT}`.yellow.bold));
