import { createSlice } from "@reduxjs/toolkit";
import { adminPostheading } from "../action/adminheader";



const initialState = {
  isLoading: false,
  listdata: [],
  error: "",
};
const Postadminheading = createSlice({
  name: "heading",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(adminPostheading.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(adminPostheading.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listdata = action?.payload;
      state.error = "";
    });
    bulider.addCase(adminPostheading.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

export default Postadminheading.reducer;
