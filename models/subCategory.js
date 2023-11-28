const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

SubCategorySchema.virtual("url").get(function() {
    return `/inventory/subcategory/${this._id}`;
})

exports.module = new mongoose.model("SubCategory", SubCategorySchema);