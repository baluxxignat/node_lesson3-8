const ErrorHandler = require('../errors/ErrorHandler');
const Cars = require('../dataBase/Car');
const { M_NOT_FOUND } = require('../config/messages');
const { NOT_FOUND, BAD_REQUEST } = require('../config/statusCodes');
const { carValidator } = require('../validators');

module.exports = {

    isCarExist: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Cars.findById(car_id);

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
