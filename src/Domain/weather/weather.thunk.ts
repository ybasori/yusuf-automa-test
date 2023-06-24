import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const apiKey = "5f386d0eea792de8e4b3a55cbe7680e4";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (params: { lat: number; lng: number }, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lng}&units=metric&APPID=${apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response);
      }
      return rejectWithValue(err);
    }
  }
);

export const getForecast = createAsyncThunk(
  "weather/getForecast",
  async (params: { lat: number; lng: number }, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lng}&units=metric&APPID=${apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response);
      }
      return rejectWithValue(err);
    }
  }
);
