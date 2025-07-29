const User = require('../models/user');
const bcrypt = require('bcrypt')


const signUpUSer = async (req,res)=>{
    try{
        const user = new User(req.body);

        await user.save()
        res.send('User Added Successfully')
    }catch(error){
        res.status(400).send(`Database Error : ${error.message}`)
    }
};

const getUserByEmail = async (req,res)=>{
    const emailId = req.query.emailId;
    try {   
        const user = await User.findOne({emailId})
        if(!user) return res.status(404).send('User not found');
        res.send(user)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });

    }
};

const updateUser = async(req,res)=>{
    const {userId,...updates} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId,updates,{new:true});
        if(!updatedUser) return res.status(404).send('User not found');
res.send({message:'User updated successfully', data: updatedUser});

    } catch (error) {
        res.status(500).send('Server Error')
    }
}


const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    }catch(error){
        res.status(500).send('Server Error')
    }
}


const login  = async (req,res)=>{
    const {emailId,password} = req.body;

    try{
        const user = await User.findOne({emailId}).select('+password')
        if(!user){
            return res.status(400).send('Invalid Credentials')
        }

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).send('Invalid Credentials')
        }

        res.send('Login Successfull')
    }catch(error){
        console.error('error')
        res.status(500).send('Server Error')
    }
}


module.exports = {signUpUSer,getUserByEmail,updateUser,getAllUsers,login}