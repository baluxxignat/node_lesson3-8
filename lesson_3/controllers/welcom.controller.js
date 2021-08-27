const users = require('../database/users.json');

module.exports = {
    getWelcomePage: (req, res) => {
        res.render('welcome', { users });
    }
};
