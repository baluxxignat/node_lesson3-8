const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');
const { ErrorHandler } = require('../errors');
const { statusCodes: { CODE_AUTH } } = require('../config');
const { messages: { INV_TOKEN } } = require('../config');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '16m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secretWord = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
        }
    }
};
