import Conversation from "../model/conversation.js";

export const newConversation = async (req, res) => {
    try {
        console.log(req.body)
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const exist = await Conversation.find({members: {$all: [senderId, receiverId]}})
        if(exist != "") {
            console.log("Exist Data : ", exist)
            return res.status(200).json("conversation already exists");
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })

        await newConversation.save();
        return res.status(201).json('conversation saved successfully !!');
    } catch(err) {
        return res.status(500).json("Error while creating new conversation ", err.message);
    }
}

export const getConversation = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        console.log("sender data: ", senderId);

        let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId]}})
        console.log("conversation : " ,conversation);
        return res.status(200).json(conversation);
    } catch(err) {
        return res.status(500).json("Error while getting conversation ", err.message);
    }
}