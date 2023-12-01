const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

UserSchema.virtual("url").get(function() {
    return `/user/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);