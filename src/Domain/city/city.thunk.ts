import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getCity = createAsyncThunk(
  "city/getCity",
  async (params: { keyword: string }, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://api.geonames.org/searchJSON?q=${params.keyword}&maxRows=1&username=ybasori`,
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
