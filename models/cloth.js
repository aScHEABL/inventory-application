const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothSchema = new Schema({
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    size: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true }],
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true }],
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    subGenre: { type: mongoose.Schema.Types.ObjectId, ref: 'SubGenre', required: true },
  });

ClothSchema.virtual("url").get(function() {
    return `/inventory/cloth/${this._id}`;
})

module.exports = mongoose.model("Cloth", ClothSchema);