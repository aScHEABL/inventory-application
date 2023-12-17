const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothInstanceSchema = new Schema({
    cloth: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloth', required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  });

ClothInstanceSchema.virtual("url").get(function() {
  return `/shop/inventory/clothinstance/${this._id}`;
})

ClothInstanceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("ClothInstance", ClothInstanceSchema);