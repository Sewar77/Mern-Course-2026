import Message from "../models/messages.Model.js";

export const createMessage = async (req, res) => {
    const { message, userId } = req.body
    try {
        if (!message) {
            return res.status(400).json({ message: "message can be empty" })
        }
        const newMessage = await Message.create({ message, userId })
        return res.status(201).json({ newMessage })
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}


export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).populate("userId", "name email")
        return res.status(200).json({ messages })
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}

export const updateMessageStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const updatedStatus = await Message.findByIdAndUpdate(
            id,
            { status: status === "approve" },
            { new: true }
        )

        return res.status(200).json({ message: "Status updated", updatedStatus })

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}






