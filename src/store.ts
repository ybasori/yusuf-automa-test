import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cityReducer from "./Domain/city/city.reducer";
import weatherReducer from "./Domain/weather/weather.reducer";
import savedDataReducer from "./Domain/savedData/savedData.reducer";

const reducers = combineReducers({
  city: cityReducer,
  weather: weatherReducer,
  savedData: savedDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["savedData"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
