const Joi = require('joi');
const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../config/constans');
const userRolesEnum = require('../config/user-roles.enum');

// for example:
// const girlValidator = Joi.object({
//     name: Joi.string(),
//     age: Joi.number().min(15).max(60)
// });

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required().trim(),
    email: Joi.string().regex(EMAIL_REGEXP).required().trim(),
    password: Joi.string().regex(PASSWORD_REGEXP).required().trim(),
    role: Joi.string().allow(...Object.values(userRolesEnum))

    // for example:
    // born_year: Joi.number().min(CURRENT_YEAR - 110).max(CURRENT_YEAR - 6),
    // car: Joi.boolean(),
    // girls: Joi.array().items(girlValidator)
    //     .when('car', { is: true, then: Joi.required() })
    // a: Joi.alternatives().conditional('b', { is: 5, then: Joi.string(), otherwise: Joi.number() }),
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

const preLoginValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).required().trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required().trim().required()
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    preLoginValidator
};
