const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothInstanceSchema = new Schema({
    cloth: { type: mongoose.Schema.Types.ObjectId, ref: 'Cloth', required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
  });

ClothInstanceSchema.virtual("url").get(function() {
  return `/inventory/clothinstance/${this._id}`;
})

exports.module = mongoose.model("ClothInstance", ClothInstanceSchema);