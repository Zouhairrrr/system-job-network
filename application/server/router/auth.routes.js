const express = require('express');
const authRouter = express.Router();
const middleware = require('../middleware/auth.middlewares');
const authController = require('../controllers/auth.controller')


//? const RouteGroup = require('express-route-grouping')

authRouter.post('/auth/register',

    //! valudate user informations before creating
    middleware.validateForm,
    middleware.CheckDuplicateUser,
    middleware.CheckDuplicateEmail,
    middleware.ValidatePassword,
    //* create new User instance
    authController.CreateNewUser
);


authRouter.post('/auth/login',
    middleware.validateFormLogin,
    middleware.ValidateEmailLogin,
    middleware.ValidatePasswordLogin,
    authController.Authenticate,
);


// ?  routes for resetPassword

authRouter.post('/auth/forgotPassword', middleware.ValidateemailforPaswwordReset, authController.ForgotPassword);



authRouter.get('/auth/activateAccount/:token', authController.ActivatePassword);


authRouter.post('/auth/resetPassword', middleware.PasswordValidate, middleware.ConfirmPassword, authController.ResetPassword);


module.exports = authRouter;