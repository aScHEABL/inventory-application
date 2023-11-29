const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cloth: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloth' },
});

ReviewSchema.virtual("url").get(function() {
    return `/review/${this._id}`;
})

exports.module = mongoose.model("Review", ReviewSchema);