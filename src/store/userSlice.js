import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    maxCalls: 0,
    connected: false,
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
  },
});

export const { connectUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;
