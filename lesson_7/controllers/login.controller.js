const { passwordService: { compare } } = require('../services');
const { loginService } = require('../services');
const { user_normalizator: { userToNormalize } } = require('../utils');
const { Oauth } = require('../dataBase');
const { statusCodes: { OK }, messages: { LOG_OUT }, functionVariables: { AUTHORIZATION } } = require('../config');

module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await compare(user.password, password);

            const tokenPair = loginService.generateTokenPair();

            await Oauth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userToNormalize(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logOutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await Oauth.deleteOne({ access_token });

            res.status(OK).json(LOG_OUT);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.loginedUser;

            await Oauth.deleteOne({ refresh_token });

            const tokenPair = loginService.generateTokenPair();

            await Oauth.updateOne({ refresh_token }, tokenPair);

            res.json({
                ...tokenPair,
                user: userToNormalize(user)
            });
        } catch (e) {
            next(e);
        }
    },

};
