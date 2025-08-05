const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const checkInvalidFields = (allowedFields) => {
  return (req, res, next) => {
    const incomingFields = Object.keys(req.body);
    const invalidFields = incomingFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Invalid fields detected",
        invalidFields:invalidFields,
      });
    }

    next();
  };
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token, authorization denied");

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) return res.status(401).send("User not found");

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send("Token is not valid");
  }
};



module.exports = { verifyToken, validateRequest, checkInvalidFields };
