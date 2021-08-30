const { functionService } = require('../services');
const Users = require('../dataBase/User');
const { WAS_CREATED } = require('../config/statusCodes');
const { DELETED } = require('../config/messages');
const passwordService = require('../services/password.service');
const { userToNormalize } = require('../utils/user.normalizator');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await functionService.getAllItems(Users, req.query);

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userNormalized = userToNormalize(req.user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            const createdUser = await functionService.createItem(Users, { ...req.body, password: hashedPassword });

            const userNormalized = userToNormalize(createdUser);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await functionService.deleteCurrentItem(Users, user_id);

            res.status(WAS_CREATED).json(`${user_id} ${DELETED}`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await functionService.updateItem(Users, user_id, req.body);

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
