const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
});

CategorySchema.virtual("url").get(function() {
    return `/shop/inventory/category/${this._id}`;
})

CategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Category", CategorySchema);