const router = require('express').Router();

const {
    functionVariables: {
        ADMIN,
        USER_ID,
        PARAMS,
        ID,
        EMAIL,
        CONFLICTED_EMAIL,
        USER
    }
} = require('../config');
const { userController } = require('../controllers');
const { userValidator: { createUserValidator, updateUserValidator } } = require('../validators');
const { loginMiddleware: { validateAccessToken }, userMiddleware: { throwErrorWhenExist } } = require('../middlewares');
const {
    userMiddleware: {
        validateSomeFilds,
        checkUserRole,
        getItemByDynamicParams
    }
} = require('../middlewares');

router.get('/',
    userController.getAllUsers);

router.post('/',
    validateSomeFilds(createUserValidator),
    getItemByDynamicParams(EMAIL),
    throwErrorWhenExist(CONFLICTED_EMAIL),
    userController.createUser);

router.get('/:user_id',
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    userController.getSingleUser);

router.delete('/:user_id',
    validateAccessToken,
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    checkUserRole([ADMIN]),
    userController.deleteUser);

router.put('/:user_id',
    validateAccessToken,
    validateSomeFilds(updateUserValidator),
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    throwErrorWhenExist(),
    checkUserRole([USER]),
    userController.updateUser);

module.exports = router;
