const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = Schema(
    {
        name: { type: String, required: true, unique: false, default: "" },
        imageUrl: { type: String, required: false, default: "http://aimory.vn/wp-content/uploads/2017/10/no-image.png" },
        description: { type: String, required: true, default: "" },
        condition: { type: String, required: true, default: "" },
        category: { type: String, enum: ["clothing", "furniture", "electronics", "books"], required: true },
        owner: {
            ref: "User",
            required: true,
            type: Schema.Types.ObjectId
        },
        newOwner: {
            ref: "User",
            type: Schema.Types.ObjectId
        },
        verified: { type: String, required: false, default: false },
        offers: { type: Array },
        isSwapped: { type: String, default: false },
    },
    {
        timestaps: true
    }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;