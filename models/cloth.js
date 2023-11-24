const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
    size: { type: Array, required: true }
})