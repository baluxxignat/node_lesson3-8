const router = require('express').Router();

const { carController } = require('../controllers');
const {
    carMiddleware: {
        validateCarForCreate,
        validateCarId,
        updateCar
    }
} = require('../middlewares');
const { functionVariables: { CAR_ID, PARAMS, ID } } = require('../config');
const { userMiddleware: { getItemByDynamicParams } } = require('../middlewares');

router.get('/',
    carController.getAllCars);
router.post('/',
    validateCarForCreate,
    carController.createCar);
router.get('/:car_id',
    validateCarId,
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    carController.getSingleCar);
router.delete('/:car_id',
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    carController.deleteCar);
router.put('/:car_id',
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    updateCar,
    carController.updateCar);

module.exports = router;
