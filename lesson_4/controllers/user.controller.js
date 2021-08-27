const {
    getAllItems,
    createItem,
    deleteCurrentItem,
    updateItem
} = require('../services/services');
const Users = require('../dataBase/User');
const { WAS_CREATED } = require('../config/statusCodes');
const { DELETED } = require('../config/messages');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await getAllItems(Users, req.query);

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await createItem(Users, req.body);

            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await deleteCurrentItem(Users, user_id);

            res.status(WAS_CREATED).json(`${user_id} ${DELETED}`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await updateItem(Users, user_id, req.body);

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
