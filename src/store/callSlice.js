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
    error: null,
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
    setLeaveCallError: (state, action) => {
      console.error("End Call Error:", action.payload);
      state.error = action.payload.error;
    },
    clearCallError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  addCall, 
  leaveCall, 
  setLeaveCallError,
  clearCallError,
} = callSlice.actions;
export default callSlice.reducer;
