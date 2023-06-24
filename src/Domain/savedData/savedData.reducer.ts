import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISavedData } from "./savedData.type";
import { IItemCity } from "../city/city.type";

const initialState: ISavedData = {
  data: [],
};

export const savedData = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    saveCity: (state, action: PayloadAction<IItemCity>) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const { saveCity } = savedData.actions;

export default savedData.reducer;
