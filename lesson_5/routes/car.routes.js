const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);
router.post('/', carMiddleware.validateCarForCreate, carController.createCar);
router.get('/:car_id', carMiddleware.isCarExist, carMiddleware.validateCarId, carController.getSingleCar);
router.delete('/:car_id', carMiddleware.isCarExist, carController.deleteCar);
router.put('/:car_id', carMiddleware.isCarExist, carMiddleware.updateCar, carController.updateCar);

module.exports = router;
