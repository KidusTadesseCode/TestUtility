// src/services/chat/messageService.js
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class MessageService {
  async saveMessage(conversationId, messageData) {
    const payload = {
      messageID: messageData.id || uuidv4(),
      createdAt: messageData.createdAt || new Date(),
      sender: messageData.role === "user" ? "user" : "bot",
      text: messageData.content,
    };

    await axios.post(
      `/api/chat/conversations/${conversationId}/messages`,
      payload
    );
  }

  async saveUserMessage(conversationId, messageText) {
    const payload = {
      messageID: uuidv4(),
      createdAt: new Date(),
      sender: "user",
      text: messageText,
    };

    await axios.post(
      `/api/chat/conversations/${conversationId}/messages`,
      payload
    );
  }
}
const messageService = new MessageService();

export default messageService;
