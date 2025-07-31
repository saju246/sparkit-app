const express = require('express');
const profileRouter = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware')
const {viewProfile} = require('../controllers/profileController')

profileRouter.get('/viewProfile',verifyToken,viewProfile)

module.exports = profileRouter;