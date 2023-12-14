const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    type: {
        type: String,
        enum: ['small', 'medium', 'large', 'extra-large',],
    },
});

SizeSchema.virtual("url").get(function() {
    return `/size/${this._id}`;
})

SizeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Size", SizeSchema);