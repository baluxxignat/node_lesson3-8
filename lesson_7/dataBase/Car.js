const { Schema, model } = require('mongoose');

const carShema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

}, { timestamps: true });

module.exports = model('Car', carShema);
