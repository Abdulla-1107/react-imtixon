import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedPhone: null as null | any,
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setSelectedPhone(state, action: PayloadAction<any>) {
      state.selectedPhone = action.payload;
    },
    clearSelectedPhone(state) {
      state.selectedPhone = null;
    },
  },
});

export const { setSelectedPhone, clearSelectedPhone } = phoneSlice.actions;
export default phoneSlice.reducer;
