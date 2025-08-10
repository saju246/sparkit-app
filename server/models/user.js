const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    // index:true,
  },
  lastName: { type: String },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email address :' + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error('Password is not strong enough');
      }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid URL');
      }
    }
  },
  about: {
    type: String,
    default: "This is a default about of the user!",
  },
  skills: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save',async function(next){
  const user = this;
  if(user.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
  }
  next()
})



userSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

userSchema.methods.comparePassword = async function (candidatePassword){
  return await bcrypt.compare(candidatePassword,this.password) 
}

module.exports = mongoose.model("User", userSchema);



