const Joi = require('joi');

const { user_roles_enum, constans: { PASSWORD_REGEXP, EMAIL_REGEXP } } = require('../config');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required().trim(),
    email: Joi.string().regex(EMAIL_REGEXP).required().trim(),
    password: Joi.string().regex(PASSWORD_REGEXP).required().trim(),
    role: Joi.string().allow(...Object.values(user_roles_enum))
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
