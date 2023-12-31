const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenderSchema = new Schema({
    name: { type: String, required: true },
});

GenderSchema.virtual("url").get(function() {
    return `/shop/inventory/gender/${this._id}`;
})

GenderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Gender", GenderSchema);