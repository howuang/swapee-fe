const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferRequestSchema = Schema(
    {
        item: {
            ref: "Item",
            required: true,
            type: Schema.Types.ObjectId
        },
        owner: {
            ref: "User",
            required: true,
            type: Schema.Types.ObjectId
        },
        itemOffer: {
            ref: "Item",
            required: true,
            type: Schema.Types.ObjectId
        },
        message: {
            type: String,
            required: false,
            default: ""
        },
        status: {
            type: String,
            enum: ["pending", "success", "denied"],
            required: true,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const OfferRequest = mongoose.model("OfferRequest", OfferRequestSchema);
module.exports = OfferRequest;