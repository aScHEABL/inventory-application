const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    type: {
        type: String,
        enum: ['small', 'medium', 'large', 'extra-large',],
    },
});

module.exports = mongoose.model("Size", SizeSchema);