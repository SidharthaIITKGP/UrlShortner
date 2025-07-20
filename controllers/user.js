const User = require('../models/user'); // Assuming you have a User model defined

async function handleUserSignup(req, res) {
         try {
        await User.create({ name, email, password });
        return res.render("home");
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("Something went wrong.");
    }
} 

module.exports = {handleUserSignup};