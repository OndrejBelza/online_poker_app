import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./redux/socket/socketSlice";

export default configureStore({
  reducer: {
    socket: socketReducer,
  },
});
