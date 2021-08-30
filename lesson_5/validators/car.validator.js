const Joi = require('joi');
const { CURRENT_YEAR } = require('../config/constans');

const createCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(110).required().trim(),
    year: Joi.number().required().max(CURRENT_YEAR),
    price: Joi.number()
});

const updateCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(110).trim(),
    year: Joi.number().max(CURRENT_YEAR),
    price: Joi.number()
});

module.exports = {
    createCarValidator,
    updateCarValidator
};
