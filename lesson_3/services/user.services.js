const fs = require('fs/promises');
let users = require('../database/users.json');
const { pathToDatabase } = require('../config/veriables');

module.exports = {
    readUsersFromDB: async () => {
        const readUsers = await fs.readFile(pathToDatabase, 'utf-8');
        return JSON.parse(readUsers);
    },

    writeUsersToDB: async (newUser) => {
        const readUsers = await fs.readFile(pathToDatabase, 'utf-8');
        users = JSON.parse(readUsers);
        users.push(newUser);
        fs.writeFile(pathToDatabase, JSON.stringify(users));
    }
};
