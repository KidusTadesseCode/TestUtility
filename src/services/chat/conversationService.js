// src/services/chat/conversationService.js
import axios from "axios";

class ConversationService {
  async getConversations() {
    const response = await axios.get("/api/chat/conversations");
    return response.data || [];
  }

  async createConversation(modelName) {
    const response = await axios.post("/api/chat/conversations", {
      modelName: modelName.replace("models/", ""),
    });
    return response.data;
  }

  async deleteConversation(conversationId) {
    await axios.delete(`/api/chat/conversations/${conversationId}`);
  }

  async getConversationDetails(conversationId) {
    const response = await axios.get(
      `/api/chat/conversations/${conversationId}`
    );
    return response.data;
  }

  async updateConversationTitle(conversationId, title) {
    const response = await axios.patch(
      `/api/chat/conversations/${conversationId}`,
      { title }
    );
    return response.data;
  }
}

const conversationService = new ConversationService();
export default conversationService;
