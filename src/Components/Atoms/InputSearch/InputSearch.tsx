import React, { useCallback, useEffect, useState } from "react";
import styles from "./InputSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getCity } from "../../../Domain/city/city.thunk";
import { getForecast, getWeather } from "../../../Domain/weather/weather.thunk";
import {
  setCity,
  setKeyword as setKeywordRd,
} from "../../../Domain/city/city.reducer";

const InputSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { city: cityState, weather: weatherState } = useSelector(
    (state: RootState) => ({
      city: state.city,
      weather: state.weather,
    })
  );
  const [isGettingWF, setIsGettingWF] = useState(false);
  const [keyword, setKeyword] = useState("Jakarta");
  const [firstTime, setFirstTime] = useState(true);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setKeywordRd(keyword));
  };

  const getWeatherForecast = useCallback(
    (lat: number, lng: number) => {
      //   const dt = new Date();
      //   if (dt.getTime() - lastReq > 3000) {
      //   setlastReq(dt.getTime());
      dispatch(getWeather({ lat, lng }));
      dispatch(
        getForecast({
          lat,
          lng,
        })
      );
      //   }
    },
    [dispatch]
  );

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherForecast(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          dispatch(setKeywordRd("Jakarta"));
        }
      );
    }
  }, [dispatch, getWeatherForecast]);

  useEffect(() => {
    if (
      firstTime &&
      cityState.city === null &&
      !weatherState.loadingWeather &&
      weatherState.weather !== null
    ) {
      setFirstTime(false);
      setKeyword(weatherState.weather.name);
      dispatch(
        setCity({
          name: weatherState.weather.name,
          lat: weatherState.weather.coord.lat,
          lng: weatherState.weather.coord.lon,
        })
      );
    }
  }, [
    cityState.city,
    dispatch,
    firstTime,
    weatherState.loadingWeather,
    weatherState.weather,
  ]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (cityState.keyword !== "") {
      console.log("cityState.keyword");
      console.log(cityState.keyword);
      setKeyword(cityState.keyword);
      dispatch(
        getCity({
          keyword: cityState.keyword,
        })
      );
      setIsGettingWF(true);
    }
  }, [cityState.keyword, dispatch]);

  useEffect(() => {
    if (isGettingWF && !cityState.loadingCity) {
      setIsGettingWF(false);
      setFirstTime(false);
      getWeatherForecast(cityState.city?.lat ?? 0, cityState.city?.lng ?? 0);
    }
  }, [cityState.city, cityState.loadingCity, getWeatherForecast, isGettingWF]);

  return (
    <>
      <form className={styles["container"]} onSubmit={onSubmit}>
        <input
          className={styles["input"]}
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
        <button
          className={styles["btn-submit"]}
          type="submit"
          disabled={cityState.loadingCity}
        >
          {cityState.loadingCity ? "..." : "Search"}
        </button>
      </form>
    </>
  );
};

export default InputSearch;
