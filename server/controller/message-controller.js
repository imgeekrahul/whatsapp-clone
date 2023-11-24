import Message from "../model/Message.js"
import conversation from "../model/conversation.js";

export const newMessage = async (req, res) => {
    try {

        console.log("Message-Body: ", req.body);

        const newMessage = new Message(req.body);
        await newMessage.save();
        await conversation.findByIdAndUpdate(req.body.conversationId, {
            message: req.body.text
        })

        return res.status(201).json("message has been sent successfully !!")
    } catch(err) {
        return res.status(500).json(err.message);
    }
}

export const getMessages = async (req, res) => {
    try {
        const message = await Message.find({conversationId: req.params.id})
        console.log("Message: ",message);
        return res.status(200).json(message)
    } catch(err) {
        return res.status(500).json(err.message)
    }
}