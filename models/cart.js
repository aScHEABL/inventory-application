const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothInstance' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

CartSchema.virtual("url").get(function() {
    return `/user/cart/${this._id}`;
})

exports.module = mongoose.model("Cart", CartSchema);