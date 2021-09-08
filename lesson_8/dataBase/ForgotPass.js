const { Schema, model } = require('mongoose');

const { dataBaseTokenEnum: { USER, ACTION_TOKEN } } = require('../config');

const ForgotPass = new Schema({

    action_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, ForgotPass);
