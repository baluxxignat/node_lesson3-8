const ErrorHandler = require('../errors/ErrorHandler');
const Users = require('../dataBase/User');
const { ALREADY_EXIST, M_NOT_FOUND } = require('../config/messages');
const { CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../config/statusCodes');
const userValidator = require('../validators/user.validator');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            // const user = await Users.findById(user_id).select('_id name password');
            const user = await Users.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, M_NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await Users.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, `${email} ${ALREADY_EXIST}`);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            console.log(value);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateSomeFildsUser: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    preLoginUser: (req, res, next) => {
        try {
            const { error } = userValidator.preLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
