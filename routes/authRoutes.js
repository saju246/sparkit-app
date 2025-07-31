const express = require('express');
const authRouter = express.Router();
const {signupValidation,loginValidation} = require('../validators/userValidator');
const {validateRequest} = require('../middlewares/authMiddleware')
const {signUpUSer,login} = require('../controllers/authController')

// const ALLOWED_UPDATE_FIELDS = ["userId","photoUrl","about","gender","age","skills"]


authRouter.post('/signup',signupValidation,validateRequest,signUpUSer);
authRouter.post('/login',loginValidation,validateRequest,login)



module.exports = authRouter;