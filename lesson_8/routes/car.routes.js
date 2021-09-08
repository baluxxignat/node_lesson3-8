const router = require('express').Router();

const { Car } = require('../dataBase');
const { carController } = require('../controllers');
const { functionVariables: { CAR_ID, PARAMS, ID } } = require('../config');
const {
    carMiddleware: {
        validateCarForCreate,
        validateCarId,
        updateCar
    },
    userMiddleware: { getItemByDynamicParams }
} = require('../middlewares');

router.get('/',
    carController.getAllCars);
router.post('/',
    validateCarForCreate,
    carController.createCar);
router.get('/:car_id',
    validateCarId,
    getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
    carController.getSingleCar);
router.delete('/:car_id',
    validateCarId,
    getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
    carController.deleteCar);
router.put('/:car_id',
    validateCarId,
    updateCar,
    getItemByDynamicParams(Car, CAR_ID, PARAMS, ID),
    carController.updateCar);

module.exports = router;
