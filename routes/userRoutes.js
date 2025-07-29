const express = require('express');
const router = express.Router();
const {signupValidation,updateUserValidation,loginValidation} = require('../validators/userValidator');
const {validateRequest,checkInvalidFields} = require('../middlewares/validateRequest');
const {signUpUSer,updateUser,getUserByEmail,getAllUsers,login} = require('../controllers/userController')

const ALLOWED_UPDATE_FIELDS = ["userId","photoUrl","about","gender","age","skills"]


router.post('/signup',signupValidation,validateRequest,signUpUSer);
router.get('/user',getUserByEmail);
router.patch('/user',updateUserValidation,validateRequest,checkInvalidFields(ALLOWED_UPDATE_FIELDS),updateUser);
router.get('/feed',getAllUsers);
router.post('/login',loginValidation,validateRequest,login)

module.exports = router;