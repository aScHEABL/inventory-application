const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
    imageURL: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  });

ClothingSchema.virtual("url").get(function() {
    return `/shop/inventory/clothing/${this._id}`;
})

ClothingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Clothing", ClothingSchema);