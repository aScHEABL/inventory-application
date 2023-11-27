const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    name: { type: String, required: true },
});

SizeSchema.virtual("url").get(function() {
    return `/inventory/size/${this._id}`;
})

exports.module = mongoose.model("Size", SizeSchema);