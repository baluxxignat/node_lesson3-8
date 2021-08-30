const Users = require('../dataBase/User');
const {
    MAIL_OR_PASS,
    FIELDS_EMPTY
} = require('../config/messages');
const {
    NOT_FOUND,
    BAD_REQUEST
} = require('../config/statusCodes');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            console.log(email);
            const user = await Users.findOne({ email });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, MAIL_OR_PASS);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginationNotEmpty: (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!password || !email) {
                throw new ErrorHandler(BAD_REQUEST, FIELDS_EMPTY);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
