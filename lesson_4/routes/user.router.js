const router = require('express').Router();

const { userController } = require('../controllers');
const {
    isUserPresent,
    checkUniqueEmail,
    isFildsNotEmpty
} = require('../middlewares/user.middleware');

router.get('/', userController.getAllUsers);
router.post('/', isFildsNotEmpty, checkUniqueEmail, userController.createUser);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);
router.put('/:user_id', isFildsNotEmpty, isUserPresent, userController.updateUser);

module.exports = router;
