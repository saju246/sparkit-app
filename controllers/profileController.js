const User = require("../models/user");
const bcrypt = require('bcrypt')

const viewProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error",error.message);
  }
};

const editProfile = async (req, res) => {
  let updates = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).send("user not found");
    }

    res.send({
      messsage: "profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send("Server Error", error.message);
  }
};


const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId).select('+password'); 
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send('Incorrect Current Password');
        }

        if (currentPassword === newPassword) {
            return res.status(400).send('New Password should not be same as Current Password');
        }

        user.password = newPassword; 
        await user.save();

        res.send('Password changed successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error',error.message);
    }
};

module.exports = {
  viewProfile,
  editProfile,
  changePassword
};
