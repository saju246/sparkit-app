const express = require('express');
const profileRouter = express.Router();
const {verifyToken,validateRequest,checkInvalidFields} = require('../middlewares/authMiddleware')
const {viewProfile,editProfile,changePassword} = require('../controllers/profileController')
const {editProfileValidation,changePasswordValidation} = require('../validators/userValidator')

const ALLOWED_UPDATE_FIELDS = ["firstName", "photoUrl", "about", "gender", "age", "skills"];

profileRouter.get('/view',verifyToken,viewProfile)
profileRouter.patch('/edit',verifyToken,editProfileValidation,validateRequest,checkInvalidFields(ALLOWED_UPDATE_FIELDS),editProfile)
profileRouter.patch('/password',verifyToken,changePasswordValidation,changePassword)

module.exports = profileRouter;