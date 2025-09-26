const {v4 : uuidv4}= require('uuid')
const User = require('../models/user'); // Assuming you have a User model defined
const {setUser} =require('../service/auth')


async function handleUserSignup(req, res) {
        const { name, email, password } = req.body;
         try {
        await User.create({ name, email, password });
        return res.redirect("/");
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("Something went wrong.");
    }
} 

async function handleUserLogin(req, res) {
        const { email, password } = req.body;
        const user= await User.findOne({email,password});
        if(!user) return res.render('login', {
            error: 'Invalid email or password'
        })
        const sessionId = uuidv4();
        setUser(sessionId,user);
        res.cookie('uid', sessionId);
        return res.redirect("/")
        
} 

module.exports = {handleUserSignup,handleUserLogin};