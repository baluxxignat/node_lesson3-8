const router = require('express').Router();

const { functionVariables: { USER_ID, PARAMS, ID } } = require('../config');
const { userController } = require('../controllers');
const { getItemByDynamicParams } = require('../middlewares/user.middleware');
const {
    userMiddleware: {
        validateUserBody,
        isUserPresent,
        updateSomeFildsUser,
        checkUserRole
    }
} = require('../middlewares');

router.get('/',
    userController.getAllUsers);
router.post('/',
    validateUserBody,
    userController.createUser);
router.get('/:user_id',
    isUserPresent,
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.getSingleUser);
router.delete('/:user_id',
    isUserPresent,
    checkUserRole(['admin']),
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.deleteUser);
router.put('/:user_id',
    isUserPresent,
    updateSomeFildsUser,
    getItemByDynamicParams(USER_ID, PARAMS, ID),
    userController.updateUser);
module.exports = router;
