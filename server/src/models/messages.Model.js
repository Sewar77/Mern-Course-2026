import mongoose from "mongoose"
const messageSchem = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            min: 1,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    }
    , { timestamps: true }
)

const Message = mongoose.model("Message", messageSchem)

export default Message