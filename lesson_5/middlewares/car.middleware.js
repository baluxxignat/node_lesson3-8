const ErrorHandler = require('../errors/ErrorHandler');
const Cars = require('../dataBase/Car');
const { FIELDS_EMPTY, M_NOT_FOUND } = require('../config/messages');
const { NOT_FOUND, BAD_REQUEST } = require('../config/statusCodes');

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

    isFildsNotEmpty: (req, res, next) => {
        try {
            const { model, year, price } = req.body;

            if (!model || !year || !price) {
                throw new ErrorHandler(BAD_REQUEST, FIELDS_EMPTY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
