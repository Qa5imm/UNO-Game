import { createSlice } from "@reduxjs/toolkit";

// const initialState =  "" ;
const faceupCardSlice = createSlice({
  name: "faceUp",
  initialState:{card: ""},
  reducers: {
    setfaceup(state, action){
      state.card = action.payload;
    }

  },
});

export const { setfaceup} = faceupCardSlice.actions;

export default faceupCardSlice.reducer;
