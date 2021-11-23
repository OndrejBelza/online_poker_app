import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./redux/socket/socketSlice";
import userReducer from "./redux/user/userSlice";

export default configureStore({
  reducer: {
    socket: socketReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
