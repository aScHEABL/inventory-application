const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    subGenres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubGenre' }],
});

CategorySchema.virtual("url").get(function() {
    return `/inventory/category/${this._id}`;
})

exports.module = mongoose.model("Category", CategorySchema);