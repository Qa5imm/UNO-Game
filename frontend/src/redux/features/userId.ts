import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "" };
const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;

export default userIdSlice.reducer;
