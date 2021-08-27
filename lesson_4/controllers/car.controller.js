const {
    getAllItems,
    createItem,
    deleteCurrentItem,
    updateItem
} = require('../services/services');
const Cars = require('../dataBase/Car');
const { DELETED } = require('../config/messages');

module.exports = {

    getAllCars: async (req, res, next) => {
        try {
            const allCars = await getAllItems(Cars, req.query);

            res.json(allCars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await createItem(Cars, req.body);

            res.json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await deleteCurrentItem(Cars, car_id);

            res.json(`${car_id} ${DELETED}`);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const updatedCar = await updateItem(Cars, car_id, req.body);

            res.json(updatedCar);
        } catch (e) {
            next(e);
        }
    }
};
