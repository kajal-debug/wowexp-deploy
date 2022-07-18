const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var  nodemailer = require('nodemailer');



router.post('/invitation', [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() })
    }
    try {
        let { name, email, password } = request.body;

        // check if the user is exists
        let user = await User.findOne({ email: email });
        if (user) {
            return response.status(401).json({ errors: [{ msg: 'User is Already Exists' ,user:user.isAdmin}] });
        }
        if(!user){
            console.log("sending email")
            var transporter= nodemailer.createTransport({
              host: 'smtp.gmail.com',
             port:587,
                auth: {
                  user: 'kajalbaisakh7@gmail.com', // generated ethereal user
                //  pass: "Kajalb@96", // generated ethereal password
                  pass:"kootqycpxohqbsaz"
                },
            });
            var mailOption={
                from:'kajalbaisakh7@gmail.com',
                to:'kajalbaisakh123@gmail.com',
                subject:"mail for register",
                text:"Register successfully",
                html:'<p style="color:black,font-weight:bold">Click here to <a href="http://localhost:3000/users/register">Register</a>for the web page.</p>'
            }
            transporter.sendMail(mailOption,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("email has been send",info.response);
                }
            })
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt)
            user = new User({ name, email, password });
            user = await user.save();
             response.status(200).json({ msg: 'Registration is Success' });
         }

        // encode the password
        // const salt = await bcrypt.genSalt(10);
        // password = await bcrypt.hash(password, salt)
        // user = new User({ name, email, password });
        // user = await user.save();
        //  response.status(200).json({ msg: 'Registration is Success' });
       
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ errors: [{ msg: error.message }] });
    }
}

);
module.exports = router;