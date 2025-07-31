const express = require("express");
const app = express();
const { connectDB } = require("../config/database");
require('dotenv').config();
const cookieParser = require('cookie-parser')


const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes')
const requestRouter = require('../routes/requestRoutes')

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())


app.use('/',authRoutes);
app.use('/profile',profileRoutes);
app.use('/request',requestRouter);


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

