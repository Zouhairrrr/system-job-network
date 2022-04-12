const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
dotenv.config()
const SendEmail = require('./services/mail')
//  * create new user with a client default as role 


const CreateNewUser = async (req, res) => {
    const data = req.body;
    //* now we set user password to hashed password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    await userModel.create(data, (err, response) => {
        if (err) {
            console.log('ERR => ' + err);
            return res.status(400).json(err);
        } else {
            return res.status(200).json({ success: true, message: 'created successfully ^_^', data: response });
        }
    })
}

const Authenticate = async (req, res) => {
    try {
        const jwtExpirySeconds = 300
        const bodyData = req.body;
        const user = await userModel.findOne({ email: bodyData.email })
        if (!user) return res.status(500).json({ success: false, message: "user dosent exist" })
        const isValid = bcrypt.compareSync(bodyData.password, user.password)
        if (isValid) {
            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name
                },
                process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })


            return res.status(200).json({ success: true, message: "Login succeeded", data: { token } });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password dosen't match",
            })
        }


    } catch (error) {
        console.log('ERROR => ' + error);
        return res.status(500).json(error);
    }
};


const ForgotPassword = async (req, res) => {
    const email = req.body.email;
    const subject = "Reset Password"
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) return res.status(401).json({ success: false, message: "user does not exist" })
        console.log(user._id);
        // * get user email 
        const secret = process.env.ACCESS_TOKEN_SECRET;
        let payload = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, secret, { expiresIn: '10m' })
        const link = `http://localhost:9002/auth/activateAccount/${token}`;
        console.log(link);
        const text = `<p>This link is valide one time only <a href ="${link}">Reset your Password</a></p>`;
        const data = await SendEmail(process.env.EMAIL, subject, text);
        if (data) return res.status(200).json({ success: true, message: 'email sent successfully check your email address' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const ResetPassword = async (req, res) => {
    const { password, id } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = await userModel.findOneAndUpdate({ id: id }, { password: newPassword }, { new: true });
    console.log('kkkk', id);
    if (!user) return res.status(403).json({ success: false, message: 'something went wrong trying to reset password try again' });
    return res.status(200).json({ success: true, message: 'password updated successfully ^_^' });

}


const ActivatePassword = async (req, res) => {
    const { token } = req.params;
    try {
        const jwtExpirySeconds = 300
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })

        const user = await userModel.findOne({ id: payload._id })
        if (!user) return res.status(401).json({ success: false, message: 'user dosent exist' })
        // console.log(user);
        return res.status(200).json({ success: true, message: 'working on it ... Redirect ...', data: user })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            //* if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).json({ success: false, message: "Invalid token please try again" });
        }
    }
}

module.exports = { CreateNewUser, Authenticate, ForgotPassword, ResetPassword, ActivatePassword };