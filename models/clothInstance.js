const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothInstanceSchema = new Schema({
    clothing: { type: mongoose.Schema.Types.ObjectId, ref: 'Clothing', required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  }, { collection: 'clothInstances' });

ClothInstanceSchema.virtual("url").get(function() {
  return `/shop/inventory/clothInstance/${this._id}`;
})

ClothInstanceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("ClothInstance", ClothInstanceSchema);