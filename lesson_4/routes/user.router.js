const router = require('express').Router();

const { userController } = require('../controllers');
const {
    isUserPresent,
    checkUniqueEmail,
    isFildsNotEmpty
} = require('../middlewares/user.middleware');

router.get('/', userController.getAllUsers);
router.post('/', checkUniqueEmail, isFildsNotEmpty, userController.createUser);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);
router.put('/:user_id', isUserPresent, isFildsNotEmpty, userController.updateUser);

module.exports = router;
