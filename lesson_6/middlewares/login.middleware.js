const { User } = require('../dataBase');
const { messages: { MAIL_OR_PASS } } = require('../config');
const { statusCodes: { NOT_FOUND } } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            console.log(email);
            const user = await User.findOne({ email });

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
