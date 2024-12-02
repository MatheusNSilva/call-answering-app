import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    maxCalls: 0,
    connected: false,
    error: null,
  },
  reducers: {
    connectUser: (state, action) => {
      state.name = action.payload.name;
      state.maxCalls = action.payload.maxCalls;
      state.connected = true;
    },
    disconnectUser: (state) => {
      state.name = "";
      state.maxCalls = 0;
      state.connected = false;
    },
    setConnectionError: (state, action) => {
      console.error("Connection Error:", action.payload);
      state.error = action.payload.error;
    },
    setDisconnectionError: (state, action) => {
      console.error("Disconnection Error:", action.payload);
      state.error = action.payload.error;
    },
    clearUserError: (state) => {
      state.error = null;
    }
  },
});

export const {
  connectUser, 
  disconnectUser,
  setConnectionError,
  setDisconnectionError,
  clearUserError,
} = userSlice.actions;
export default userSlice.reducer;
