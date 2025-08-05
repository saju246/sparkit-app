const express = require('express');
const authRouter = express.Router();
const {signupValidation,loginValidation} = require('../validators/userValidator');
const {validateRequest} = require('../middlewares/authMiddleware')
const {signUpUSer,login,logout} = require('../controllers/authController')


authRouter.post('/signup',signupValidation,validateRequest,signUpUSer);
authRouter.post('/login',loginValidation,validateRequest,login)
authRouter.post('/logout',logout)


module.exports = authRouter;