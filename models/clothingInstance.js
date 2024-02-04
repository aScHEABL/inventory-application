const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothingInstanceSchema = new Schema({
    clothing: { type: mongoose.Schema.Types.ObjectId, ref: 'Clothing', required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  }, { collection: 'clothingInstances' });

ClothingInstanceSchema.virtual("url").get(function() {
  return `/shop/inventory/clothingInstance/${this._id}`;
})

ClothingInstanceSchema.virtual("removeInstanceURL").get(function() {
  return `/shop/inventory/clothingInstance/delete/${this._id}`;
})

ClothingInstanceSchema.set('toJSON', { virtuals: true });
ClothingInstanceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("ClothingInstance", ClothingInstanceSchema);