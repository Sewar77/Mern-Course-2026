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
        const messages = await Message.find().sort({ createdAt: -1 })
        return res.status(200).json({ messages })
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}

export const updateMessageStatus = async (req, res) => {
    const { id } = req.params
    const { newStatus } = req.body
    try {

        if (newStatus === "approve") {
            const updated = await Message.findByIdAndUpdate(id,
                {
                    status: newStatus
                }, { new: true })
            return res.status(200).json({ updated, message: "approve!" })

        }
        await Message.findByIdAndDelete(id)
        return res.status(200).json({ message: "deleted successfullt" })
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}