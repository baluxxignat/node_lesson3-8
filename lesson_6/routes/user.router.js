const router = require('express').Router();

const { functionVariables: { USER_ID, PARAMS, ID } } = require('../config');
const { userController } = require('../controllers');
const { userValidator: { createUserValidator, updateUserValidator } } = require('../validators');
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
    userController.createUser);

router.get('/:user_id',
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.getSingleUser);

router.delete('/:user_id',
    checkUserRole(['admin']),
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.deleteUser);

router.put('/:user_id',
    validateSomeFilds(updateUserValidator),
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.updateUser);

module.exports = router;
