const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddleware } = require('../middlewares');
const { preLoginUser } = require('../middlewares/user.middleware');

router.post('/', loginMiddleware.isLoginationNotEmpty, loginMiddleware.isEmailExist, loginController.getLogin);
router.get('/', preLoginUser, loginController.someInputForm);

module.exports = router;
