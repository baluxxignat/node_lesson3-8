const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);
router.post('/', carMiddleware.isFildsNotEmpty, carController.createCar);
router.get('/:car_id', carMiddleware.isCarExist, carController.getSingleCar);
router.delete('/:car_id', carMiddleware.isCarExist, carController.deleteCar);
router.put('/:car_id', carMiddleware.isFildsNotEmpty, carMiddleware.isCarExist, carController.updateCar);

module.exports = router;
