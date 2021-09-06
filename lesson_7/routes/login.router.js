const router = require('express').Router();

const { loginController } = require('../controllers');
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

router.post('/',
    preLoginUser,
    getItemByDynamicParams(EMAIL),
    throwErrorWhenExist(),
    loginController.loginUser);

router.post('/logout',
    validateAccessToken,
    loginController.logOutUser);

router.post('/refresh',
    validateRefreshToken,
    loginController.refreshToken);

module.exports = router;
