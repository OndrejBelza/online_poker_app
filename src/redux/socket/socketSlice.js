import { createSlice } from "@reduxjs/toolkit";
import createSocketClient from "../../utils/createSocketClient";
const socket = createSocketClient();
export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket,
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = socketSlice.actions;

export default socketSlice.reducer;
