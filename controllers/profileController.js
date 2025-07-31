const User = require('../models/user');

const viewProfile = async (req, res) => {
    try {
        const user = req.user;  
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    viewProfile
}