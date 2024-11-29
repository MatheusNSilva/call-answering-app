import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    activeChat: null,
  },
  reducers: {
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    endChat: (state, action) => {
      state.conversations = state.conversations.filter(
        (chat) => chat.id !== action.payload
      );
    },
  },
});

export const { addConversation, setActiveChat, endChat } = chatSlice.actions;
export default chatSlice.reducer;
