const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

router.post('/login', [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() })
    }
    try {
        let { email, password } = request.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        // check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        // create a token
        let payload = {
            user: {
                id: user.id,
                name: user.name
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 360000000 }, (err, token) => {
            if (err) throw err;
            response.status(200).json({
                msg: 'Login is Success',
                token: token
            });
        })
        if(response.status(200)){
            console.log("hii login user")
            history.push('http://localhost:2002/');
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
});

/*
    @usage : Get User Info
    @url : /api/users/
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get('/', authenticate, async (request, response) => {
    try {
        let user = await User.findById(request.user.id).select('-password');
        response.status(200).json({ user: user });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
});

module.exports = router;