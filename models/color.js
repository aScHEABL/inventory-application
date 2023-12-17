const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name: { type: String, required: true },
});

ColorSchema.virtual("url").get(function() {
    return `/shop/inventory/color/${this._id}`;
})

ColorSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Color", ColorSchema);