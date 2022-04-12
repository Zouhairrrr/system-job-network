const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET




const VerifyJwt = (req, res, next) => {

    //* grab token from either headers, req.body, or query string
    const token = req.get('token') || req.body.token || req.query.token

    //* if no token present, deny access
    if (!token) return res.status(401).json({ success: false, message: "No token provided" })

    //* otherwise, try to verify token
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedData) => {

        //* if problem with token verification, deny access
        if (err) return res.status(401).json({ success: false, message: "Invalid token." })

        //* otherwise, search for user by id that was embedded in token
        User.findById(decodedData._id, (err, user) => {
            //* if no user, deny access
            if (!user) return res.status(401).json({ success: false, message: "Invalid token." })

            //* otherwise, add user to req object
            req.user = user

            //* go on to process the route:
            next()
        })
    })
}
const CheckDuplicateUser = async (req, res, next) => {

    const { name } = req.body
    // if (!name) res.status(401).json({ success: false, message: "Please fill in the name." })
    const m = await User.findOne({ name: name })
    if (m) return res.status(401).json({ success: false, message: "User name already exists." })
    next();
    return;
}
// const CheckDuplicateEmailForgot = async (req, res, next) => {

//     const { email } = req.body
//     // if (!name) res.status(401).json({ success: false, message: "Please fill in the name." })
//     const m = await User.findOne({ email: email })
//     if (m) return res.status(401).json({ success: false, message: "Email name already exists." })
//     next();
//     return;
// }
const validateForm = (req, res, next) => {
    const data = req.body;
    if (!(data.email && data.password && data.name)) {
        return res.status(400).send({ success: false, message: "All fields is required" });
    }
    next()
}
const validateFormLogin = (req, res, next) => {
    const data = req.body;
    if (!(data.email && data.password)) {
        return res.status(400).send({ success: false, message: "All fields is required" });
    }
    next()

}


const ValidatePassword = async (req, res, next) => {
    const { password } = req.body;
    if (password) {
        const noSpecialCharacters = password.replace(/[^a-zA-Z0-9 ]/g, '');
        //! console.log(noSpecialCharacters);
        if (noSpecialCharacters.length < 8) {
            return res.status(401).json({ success: false, message: "please enter a password higher than 8 characters" })
        } else if (noSpecialCharacters.length > 20) {
            return res.status(401).json({ success: false, message: "please enter a password less than 20 characters" })
        }
        return next();
    } return res.status(401).json({ success: false, message: "Please enter a valid password" })
}
const ValidatePasswordLogin = async (req, res, next) => {
    const { password } = req.body;
    if (password) {
        return next();
    } return res.status(401).json({ success: false, message: "Please enter a valid password" })
}
const ValidateEmailLogin = async (req, res, next) => {
    const { email } = req.body;
    if (email) {
        return next();
    } return res.status(401).json({ success: false, message: "Please enter a valid email" })

}

const CheckDuplicateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (email) {
        const m = await User.findOne({ email: email });
        if (m) return res.status(401).json({ success: false, message: " email already exists login please " })
    }
    return next();
}

const Restrictions = (req, res, next, ...roles) => {

    if (!roles.includes(req.user.role))
        return res.send(404)
    next()
}

const ValidateemailforPaswwordReset = (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        return res.status(401).json({ success: false, message: " email is required" });
    }

    next()
}




const PasswordValidate = (req, res, next) => {

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password || !confirmPassword) return res.status(401).json({ success: false, message: "Please enter your password" });
    next();
}



const ConfirmPassword = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) return res.status(401).json({ success: false, message: "Password dosn't match" });
    const noSpecialCharacters = password.replace(/[^a-zA-Z0-9 ]/g, '');
    //! console.log(noSpecialCharacters);
    if (noSpecialCharacters.length < 8) {
        return res.status(401).json({ success: false, message: "please enter a password higher than 8 characters" })
    } else if (noSpecialCharacters.length > 20) {
        return res.status(401).json({ success: false, message: "please enter a password less than 20 characters" })
    }
    return next();
}







// Authentication and Authorization Middleware
const auth = (req, res, next) => {
    const session = req.session;
    if (!session) return res.status(401).json({ success: false, message: "not allowed to access please login" });
    session.userid = req.body.username;
    console.log(req.session)
};


module.exports = {
    VerifyJwt,
    CheckDuplicateUser,
    Restrictions,
    ValidatePassword,
    CheckDuplicateEmail,
    ValidatePasswordLogin,
    ValidateEmailLogin,
    validateForm,
    validateFormLogin,
    ValidateemailforPaswwordReset,
    PasswordValidate,
    ConfirmPassword,
    auth
};


