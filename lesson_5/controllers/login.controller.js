const { passwordService } = require('../services');

module.exports = {

    getLogin: async (req, res, next) => {
        try {
            const { user, body } = req;
            // console.log(user);
            // console.log('________');
            // console.log(req.body);

            await passwordService.compare(user.password, body.password);

            res.json('login successful');
        } catch (e) {
            next(e);
        }
    },

};
