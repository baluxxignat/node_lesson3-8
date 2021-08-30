const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddleware, userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.preLoginUser, loginMiddleware.isEmailExist, loginController.getLogin);

module.exports = router;
