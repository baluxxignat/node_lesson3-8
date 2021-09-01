const { ErrorHandler } = require('../errors');
const { Car } = require('../dataBase');
const { messages: { M_NOT_FOUND } } = require('../config');
const { statusCodes: { NOT_FOUND, BAD_REQUEST } } = require('../config');
const { carValidator } = require('../validators');

module.exports = {

    isCarExist: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(NOT_FOUND, `Cars with id: ${car_id}${M_NOT_FOUND}`);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarForCreate: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateCar: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarId: (req, res, next) => {
        try {
            const { error } = carValidator.getCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
