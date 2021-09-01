const { Schema, model } = require('mongoose');
const { user_roles_enum } = require('../config');

const userShema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        // select: false
    },

    role: {
        type: String,
        default: user_roles_enum.USER,
        enum: Object.values(user_roles_enum)
    }
}, { timestamps: true });

module.exports = model('user', userShema);
