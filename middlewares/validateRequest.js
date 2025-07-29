const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const checkInvalidFields = (allowedFields) => {
    return (req, res, next) => {
        const updateFields = Object.keys(req.body);
        const invalidFields = updateFields.filter(field => !allowedFields.includes(field));

        if (invalidFields.length > 0) {
            return res.status(400).json({
                message: 'Invalid fields detected',
                invalidFields
            });
        }

        next();
    };
};




module.exports = {validateRequest,checkInvalidFields};
