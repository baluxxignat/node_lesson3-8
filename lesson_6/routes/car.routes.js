const router = require('express').Router();

const { carController } = require('../controllers');
const {
    carMiddleware: {
        validateCarForCreate,
        isCarExist,
        validateCarId,
        updateCar
    }
} = require('../middlewares');
const {
    functionVariables: {
        CAR_ID,
        PARAMS,
        ID
    }
} = require('../config');
const { userMiddleware: { getItemByDynamicParams } } = require('../middlewares');

router.get('/',
    carController.getAllCars);
router.post('/',
    validateCarForCreate,
    carController.createCar);
router.get('/:car_id',
    isCarExist,
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    validateCarId,
    carController.getSingleCar);
router.delete('/:car_id',
    isCarExist,
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    carController.deleteCar);
router.put('/:car_id',
    isCarExist,
    getItemByDynamicParams(CAR_ID, PARAMS, ID),
    updateCar,
    carController.updateCar);

module.exports = router;
