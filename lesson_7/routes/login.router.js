const router = require('express')
    .Router();

const { loginController } = require('../controllers');
const {
    userMiddleware: {
        preLoginUser,
        getItemByDynamicParams,
        throwErrorWhenExist
    }
} = require('../middlewares');
const { functionVariables: { EMAIL } } = require('../config');
const { loginMiddleware: { validateAccessToken, validateRefreshToken } } = require('../middlewares');

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
