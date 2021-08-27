const router = require('express').Router();

const { welcomeController } = require('../controllers');

router.get('/', welcomeController.getWelcomePage);

module.exports = router;
