const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name: { type: String, required: true },
});

ColorSchema.virtual("url").get(function() {
    return `/inventory/color/${this._id}`;
})

module.exports = mongoose.model("Color", ColorSchema);