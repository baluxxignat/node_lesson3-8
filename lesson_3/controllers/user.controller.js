const db = require('../database/users.json');
const { readUsersFromDB, writeUsersToDB } = require('../services/user.services');

console.log(readUsersFromDB);
module.exports = {
    // Get Single User
    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        const user = db[user_id];

        if (!user) {
            res.status(404).json('user not found');
            return;
        }
        res.json(user);
    },

    getAllUsers: async (req, res) => {
        const parseUsers = await readUsersFromDB();
        res.render('users', { parseUsers });
    },

    createUser: async (req, res) => {
        const parseUsers = await readUsersFromDB();
        const { email, password, password2 } = req.body;
        const sameUserEmail = parseUsers.find((user) => user.email === email);

        // Same email
        if (sameUserEmail) {
            res.status(404).send('User exist');
            return;
        }

        // Check required fields
        if (!email || !password || !password2) {
            res.status(400).send('Please fill in all fields');
            return;
        }

        // Check passwords match
        if (password !== password2) {
            res.status(400).send('Password do not match  ');
            return;
        }

        // Check pass length
        if (password.length < 5) {
            res.status(400).send('Password should be at least 5 characters');
            return;
        }

        await writeUsersToDB({ email, password });
        res.render('users', { parseUsers });
    }

};
