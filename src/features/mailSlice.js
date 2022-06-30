import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailID: null,
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setMailID: (state, action) => {
      state.mailID = action.payload;
    },
    
  },
});

export const { setMailID } = mailSlice.actions;
export const selectMailID = (state) => state.mail.mailID;
export default mailSlice.reducer;
