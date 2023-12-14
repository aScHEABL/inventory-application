const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    imageURL: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  });

ClothSchema.virtual("url").get(function() {
    return `/inventory/cloth/${this._id}`;
})

ClothSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Cloth", ClothSchema);