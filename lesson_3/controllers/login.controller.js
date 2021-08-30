const { readUsersFromDB } = require('../services/user.services');

module.exports = {
    getLoginPage: (req, res) => {
        res.render('login');
    },

    postLoginVerification: (req, res) => {
        const { email, password } = req.body;
        const parseUsers = readUsersFromDB;
        const userById = parseUsers.find((user) => user.email === email && user.password === password);

        if (userById) {
            res.render('users', { parseUsers });
            return;
        }

        res.render('welcome');
    },
};
