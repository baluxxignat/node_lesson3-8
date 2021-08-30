const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../config/statusCodes');
const { MAIL_OR_PASS } = require('../config/messages');

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, MAIL_OR_PASS);
        }
    }
};
