const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const userRoutes = require('../routes/userRoutes');
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use('/',userRoutes);


connectDB()
  .then(() => {
    console.log(" Database Connection Established...");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.error(" Database Connection Failed:", error);
  });
