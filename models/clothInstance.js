const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothInstanceSchema = new Schema({
    cloth: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloth', required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
  });

ClothInstanceSchema.virtual("url").get(function() {
  return `/inventory/clothinstance/${this._id}`;
})

exports.module = mongoose.model("ClothInstance", ClothInstanceSchema);