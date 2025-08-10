const express = require('express')
const requestRouter = express.Router()

const {verifyToken} = require('../middlewares/authMiddleware')
const {request,review} = require('../controllers/requestController')


requestRouter.post('/send/:status/:id',verifyToken,request);
requestRouter.post('/review/:status/:requestId',verifyToken,review)

module.exports = requestRouter;