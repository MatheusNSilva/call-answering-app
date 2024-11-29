import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    maxChats: 0,
    connected: false,
  },
  reducers: {
    connectUser: (state, action) => {
      state.name = action.payload.name;
      state.maxChats = action.payload.maxChats;
      state.connected = true;
    },
    disconnectUser: (state) => {
      state.name = "";
      state.maxChats = 0;
      state.connected = false;
    },
  },
});

export const { connectUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;
