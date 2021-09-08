const router = require('express').Router();

const { loginController, passwordController } = require('../controllers');
const {
    userMiddleware: {
        preLoginUser,
        getItemByDynamicParams,
        throwErrorWhenExist
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

router.post('/password/forgot',
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    passwordController.forgotPassword);

router.get('/password/reset',
    getItemByDynamicParams(User, EMAIL),
    throwErrorWhenExist(),
    passwordController.resetPassword);

module.exports = router;
