const router = require('express').Router();

const { loginController, passwordController } = require('../controllers');
const {
    userMiddleware: {
        preLoginUser,
        getItemByDynamicParams,
        throwErrorWhenExist,
        validateNewPassword,
        validateEmailWhenForgot
    },
    loginMiddleware: {
        validateAccessToken,
        validateRefreshToken
    }
} = require('../middlewares');
const { functionVariables: { EMAIL } } = require('../config');
const { User } = require('../dataBase');

router.post('/',
    preLoginUser,
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    loginController.loginUser);

router.post('/logout',
    validateAccessToken,
    loginController.logOutUser);

router.post('/refresh',
    validateRefreshToken,
    loginController.refreshToken);

router.post('/password/forgot/send',
    validateEmailWhenForgot,
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    passwordController.forgotPassword);

router.post('/password/forgot/set',
    validateNewPassword,
    passwordController.resetPassword);

module.exports = router;
