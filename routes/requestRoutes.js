const express = require('express')
const requestRouter = express.Router()

const {verifyToken} = require('../middlewares/authMiddleware')
const {sendConnectionRequest} = require('../controllers/requestController')


requestRouter.post('/sendConnectionRequest',verifyToken,sendConnectionRequest)

module.exports = requestRouter;