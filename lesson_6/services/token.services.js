const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '16m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '16m' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        const secretWord = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

        await verifyPromise(token, secretWord);
    }
};
