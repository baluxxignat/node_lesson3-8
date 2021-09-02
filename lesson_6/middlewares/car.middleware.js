const { ErrorHandler } = require('../errors');
const { statusCodes: { BAD_REQUEST } } = require('../config');
const { carValidator } = require('../validators');

module.exports = {

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
