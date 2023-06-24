import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICity } from "./city.type";
import { getCity } from "./city.thunk";

const initialState: ICity = {
  city: null,
  loadingCity: false,
  errorCity: null,
  keyword: "",
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setCity: (
      state,
      action: PayloadAction<{ name: string; lat: number; lng: number }>
    ) => {
      state.city = {
        name: action.payload.name,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCity.pending, (state) => {
        state.city = null;
        state.loadingCity = true;
      })
      .addCase(getCity.fulfilled, (state, { payload }) => {
        const dt = payload.data.geonames?.[0] ?? null;
        console.log(state.keyword);
        if (`${state.keyword}`.toLowerCase() === `${dt.name}`.toLowerCase()) {
          state.city = dt;
        }
        state.loadingCity = false;
      })
      .addCase(getCity.rejected, (state, { payload }) => {
        state.errorCity = true;
        state.loadingCity = false;
      });
  },
});

export const { setKeyword, setCity } = citySlice.actions;

export default citySlice.reducer;
