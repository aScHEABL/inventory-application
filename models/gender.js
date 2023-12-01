const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenderSchema = new Schema({
    name: { type: String, required: true },
});

GenderSchema.virtual("url").get(function() {
    return `/inventory/gender/${this._id}`;
})

module.exports = mongoose.model("Gender", GenderSchema);