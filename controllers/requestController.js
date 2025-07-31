const User = require('../models/user');

const sendConnectionRequest = (req,res)=>{
    try{

        res.send(req.user.firstName + " is sending connection request")
    }catch(error){
         console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {sendConnectionRequest}