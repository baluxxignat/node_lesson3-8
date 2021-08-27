const { readUsersFromDB } = require('../services/user.services');

module.exports = {
    getLoginPage: (req, res) => {
        res.render('login');
    },

    postLoginVerification: async (req, res) => {
        const { email, password } = req.body;
        const parseUsers = await readUsersFromDB;
        const userById = parseUsers.find((user) => user.email === email && user.password === password);

        if (userById) {
            res.render('users', { parseUsers });
            return;
        }

        res.render('welcome');
    },
};
