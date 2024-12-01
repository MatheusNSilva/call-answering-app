import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./callSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    call: callReducer,
    user: userReducer,
  },
});

export default store;