const ErrorHandler = require('../errors/ErrorHandler');
const Users = require('../dataBase/User');
const { ALREADY_EXIST, FIELDS_EMPTY, M_NOT_FOUND } = require('../config/messages');
const { CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../config/statusCodes');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
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

    isFildsNotEmpty: (req, res, next) => {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                throw new ErrorHandler(BAD_REQUEST, FIELDS_EMPTY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
