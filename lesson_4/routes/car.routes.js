const router = require('express').Router();

const { carController } = require('../controllers');
const { isCarExist, isFildsNotEmpty } = require('../middlewares/car.middleware');

router.get('/', carController.getAllCars);
router.post('/', isFildsNotEmpty, carController.createCar);
router.get('/:car_id', isCarExist, carController.getSingleCar);
router.delete('/:car_id', isCarExist, carController.deleteCar);
router.put('/:car_id', isFildsNotEmpty, isCarExist, carController.updateCar);

module.exports = router;
