const { messages: { NO_TOKEN, INV_TOKEN } } = require('../config');
const { statusCodes: { CODE_AUTH } } = require('../config');
const { ErrorHandler } = require('../errors');
const { functionVariables: { AUTHORIZATION, USER } } = require('../config');
const { loginService: { verifyToken } } = require('../services');
const { Oauth } = require('../dataBase');

module.exports = {

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenFromDB = await Oauth.findOne({ access_token }).populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(CODE_AUTH, NO_TOKEN);
            }

            await verifyToken(refresh_token, 'refresh');

            const tokenFromDB = await Oauth.findOne({ refresh_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(CODE_AUTH, INV_TOKEN);
            }

            req.loginedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

};
