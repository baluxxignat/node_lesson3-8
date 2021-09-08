const { emailService, loginService } = require('../services');
const {
    emailActionEnum: { FORGOT_PASSWORD },
    statusCodes: { OK },
    messages: { DONE }
} = require('../config');
const { ForgotPass } = require('../dataBase');

module.exports = {

    forgotPassword: async (req, res, next) => {
        try {
            const { user: { name, _id, email } } = req;

            const actionToken = await loginService.generateactionToken();
            const newActionToken = actionToken.action_token;

            await ForgotPass.create({ ...actionToken, user: _id });

            await emailService.sendMail(email, FORGOT_PASSWORD, { name, newActionToken });
            res.status(OK).json(DONE);
        } catch (e) {
            next(e);
        }
    },

    resetPassword: (req, res, next) => {
        try {
            // not finished, but i will do it (((
        } catch (e) {
            next(e);
        }
    },

};
