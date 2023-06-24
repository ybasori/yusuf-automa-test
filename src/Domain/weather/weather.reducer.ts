import { createSlice } from "@reduxjs/toolkit";
import { IWeather } from "./weather.type";
import { getWeather, getForecast } from "./weather.thunk";
import { dayLong } from "./weather.constant";

const initialState: IWeather = {
  weather: null,
  loadingWeather: false,
  errorWeather: null,
  forecast: null,
  loadingForecast: false,
  errorForecast: null,
};

export const citySlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWeather.pending, (state) => {
        state.weather = null;
        state.loadingWeather = true;
      })
      .addCase(getWeather.fulfilled, (state, { payload }) => {
        state.weather = payload.data;
        state.loadingWeather = false;
      })
      .addCase(getWeather.rejected, (state, { payload }) => {
        state.errorWeather = true;
        state.loadingWeather = false;
      })
      .addCase(getForecast.pending, (state) => {
        state.forecast = null;
        state.loadingForecast = true;
      })
      .addCase(getForecast.fulfilled, (state, { payload }) => {
        state.forecast = payload.data.list
          .filter(
            (
              item: { dt_txt: string },
              index: number,
              self: { dt_txt: string }[]
            ) => {
              const dt = item.dt_txt.split(" ")[0];
              return (
                self.findIndex(
                  (subitem) => subitem.dt_txt.split(" ")[0] === dt
                ) === index
              );
            }
          )
          .filter((_: null, index: number) => index < 6 && index > 0)
          .map(
            (item: {
              dt_txt: string;
              main: { temp_min: number; temp_max: number };
            }) => {
              const dt = new Date(item.dt_txt.split(" ")[0]);
              return {
                title: dayLong[dt.getDay()],
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
              };
            }
          );
        state.loadingForecast = false;
      })
      .addCase(getForecast.rejected, (state, { payload }) => {
        state.errorForecast = true;
        state.loadingForecast = false;
      });
  },
});

export default citySlice.reducer;
