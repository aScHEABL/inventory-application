const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothSchema = new Schema({
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    name: { type: String, required: true },
    sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
    colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
    description: { type: String, required: true },
    gender: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    subGenre: { type: mongoose.Schema.Types.ObjectId, ref: 'SubGenre' },
  });

ClothSchema.virtual("url").get(function() {
    return `/inventory/cloth/${this._id}`;
})

module.exports = mongoose.model("Cloth", ClothSchema);