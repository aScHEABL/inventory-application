const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    date: { type: Date, required: true },
    status: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothInstance' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

OrderSchema.virtual("url").get(function() {
    return `/order/${this._id}`;
})

exports.module = mongoose.model("Order", OrderSchema);