import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    calls: [],
    callId: null,
    startDate: null,
    media: "",
    service: "",
    caller: "",
    activeCall: null,
  },
  reducers: {
    addCall: (state, action) => {
      state.calls.push(action.payload);
      state.callId = action.payload.callId;
      state.media = action.payload.media;
      state.startDate = action.payload.startDate;
      state.service = action.payload.service;
      state.caller = action.payload.caller;
    },
    leaveCall: (state, action) => {
      state.calls = state.calls.filter(
        (call) => call.callId !== action.payload.callId
      );
    },
  },
});

export const { addCall, leaveCall } = callSlice.actions;
export default callSlice.reducer;
