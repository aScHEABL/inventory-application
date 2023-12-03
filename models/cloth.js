const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    size: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true }],
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  });

ClothSchema.virtual("url").get(function() {
    return `/inventory/cloth/${this._id}`;
})

ClothSchema.virtual("stock").get(function() {
    return 
})

module.exports = mongoose.model("Cloth", ClothSchema);