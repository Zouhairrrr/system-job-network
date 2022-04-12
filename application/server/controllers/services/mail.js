const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv');
dotenv.config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


const SendEmail = async (email, subject, text) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                pass: process.env.PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const messageOptions = {
            from: process.env.EMAIL,
            subject: subject,
            text: text,
            to: email,
        };

        return await transporter.sendMail(messageOptions);
    } catch (error) {
        return error;
    }
};


module.exports = SendEmail;
