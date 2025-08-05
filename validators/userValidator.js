
const {body} = require('express-validator');


const signupValidation = [
    body('firstName').isLength({min:4,max:50}).withMessage('First Name Should Be 4-50 Characters'),
    body('lastName').optional(),
    body('emailId').isEmail().withMessage('Invalid Email').normalizeEmail(),
    body('password').isStrongPassword().withMessage('Weak Password'),
    body('age').optional().isInt({min:18}).withMessage('Age Must Be Atleast 18'),
    body('gender').optional().isIn(['male','female','other']),
    body('photoUrl').optional().isURL().withMessage('Invalid Photo URL'),
    body('skills').isArray({min:1,max:10}).withMessage('Skills Must Be Non Empty And Within 10')
];

const loginValidation = [
    body('emailId').isEmail().withMessage('Valid Email Required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password Required')
]


const editProfileValidation = [
     body('firstName').optional().isLength({min:4,max:50}).withMessage('First Name Should Be 4-50 Characters'),
    body('photoUrl').optional().isURL().withMessage('Invalid Photo URL'),
    body('about').optional().isString(),
    body('gender').optional().isIn(['male','female','other']),
    body('age').optional().isInt({min:18}),
    body('skills').optional().isArray().custom((skills)=>{
        if(skills.length > 10){
            throw new Error('Skills cannot exceeded 10 items')
        }
        return true;
    }),
];

const changePasswordValidation = [
     body('password').isStrongPassword().withMessage('Weak Password')
]

module.exports = {signupValidation,loginValidation,editProfileValidation,changePasswordValidation}