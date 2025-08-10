const express = require('express');
const userRouter = express.Router();

const {verifyToken} = require('../middlewares/authMiddleware')
const {connections,requests,feed} = require('../controllers/userController')

userRouter.get('/connections',verifyToken,connections);
userRouter.get('/requests/recieved',verifyToken,requests)
userRouter.get('/feed',verifyToken,feed)

module.exports = userRouter