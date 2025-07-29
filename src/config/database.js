const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://sajarudheensaju:tK4mYCCdtZXwfMsK@sparkit.65e8sbp.mongodb.net/SparkIt');
};

module.exports = { connectDB };
