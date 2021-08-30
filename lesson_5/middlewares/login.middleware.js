const Users = require('../dataBase/User');
const { MAIL_OR_PASS } = require('../config/messages');
const { NOT_FOUND } = require('../config/statusCodes');
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

};
