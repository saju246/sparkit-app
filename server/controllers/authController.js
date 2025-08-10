const User = require("../models/user");

const signUpUSer = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send(`Database Error : ${error.message}`);
  }
};

const login = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId }).select("+password");
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    const token = user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send("Login Successful");
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: false,
      path: "/",
    });
    res.send("Logged out");
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
};

module.exports = {
  signUpUSer,
  login,
  logout,
};
