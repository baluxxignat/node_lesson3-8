const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler } = require('../errors');
const {
    variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY },
    statusCodes: { CODE_AUTH },
    messages: { INV_TOKEN },
    functionVariables: { ACCESS }
} = require('../config');

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

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretWord = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
        }
    }
};
