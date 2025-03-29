import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    
    let gotConversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId]
      },
    });
    if(!gotConversation){
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      })
  };

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
   
      gotConversation.messages.push(newMessage._id);
    } else {
      console.log("Message not created");
    }
        
    await gotConversation.save();

    //socket io:


    return res.status(200).json({message:"message send successfully"})

  } catch (error) {
    res.status(500).json({ message: "message error " });
    console.log(error.message);
  }
}

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId]
      },
    }).populate("messages");

    return res.status(200).json( conversation?.messages );
    
  } catch (error) {
    res.status(500).json({ message: "message error " });
    console.log(error.message);
  }
}