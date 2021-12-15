const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembershipSchema = Schema(
    {
        type: {type: String, enum:["basic", "pro", "premium"], required: true, default: "basic"},
        user: {
            ref: "User",
            required: true,
            type: Schema.Types.ObjectId
        },
        source: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: false, default: "USD" },
        
    }
);


const Membership = mongoose.model("Membership", MembershipSchema);
module.exports = Membership;