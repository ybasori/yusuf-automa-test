import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";
import ListWeather from "../../Components/Molecules/ListWeather/ListWeather";
import WeatherForecast from "../../Components/Molecules/WeatherForecast/WeatherForecast";
import MainWeather from "../../Components/Molecules/MainWeather/MainWeather";
import Sun from "../../Components/Atoms/Sun/Sun";
import InputSearch from "../../Components/Atoms/InputSearch/InputSearch";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Components/Atoms/Select/Select";
import { setKeyword } from "../../Domain/city/city.reducer";

const Home: React.FC = () => {
  const {
    city: cityState,
    weather: weatherState,
    savedData: savedDataState,
  } = useSelector((state: RootState) => ({
    city: state.city,
    weather: state.weather,
    savedData: state.savedData,
  }));
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected("");
  }, [cityState.keyword]);
  return (
    <div className={styles["container"]}>
      <div className={styles["select"]}>
        <Select
          placeholder="Choose saved data"
          value={selected}
          onChange={(e) => {
            setSelected(e.currentTarget.value);
            dispatch(setKeyword(e.currentTarget.value));
          }}
          options={savedDataState.data?.map((item) => ({
            text: item.name,
            value: item.name,
          }))}
        />
      </div>
      <InputSearch />
      {cityState.loadingCity ? (
        <div className={styles["white-text"]}>...</div>
      ) : (
        <>
          {weatherState.loadingWeather ? (
            <div className={styles["white-text"]}>...</div>
          ) : (
            <>
              {weatherState.weather !== null && cityState.city !== null ? (
                <div className={styles["main-weather"]}>
                  <MainWeather
                    temperatureOne={weatherState.weather?.main.temp}
                    temperatureTwo={weatherState.weather?.main.temp_min}
                    temperatureThree={weatherState.weather?.main.temp_max}
                    temperatureFour={weatherState.weather?.main.feels_like}
                    title={weatherState.weather?.weather[0].main}
                    icon={<Sun />}
                  />
                </div>
              ) : (
                <div className={styles["white-text"]}>Not Available</div>
              )}
            </>
          )}
          <>
            {weatherState.loadingForecast ? (
              <div className={styles["white-text"]}>...</div>
            ) : (
              <>
                {weatherState.forecast !== null && cityState.city !== null ? (
                  <>
                    <div className={styles["forecast"]}>
                      <WeatherForecast
                        wind={29}
                        rain={6.33}
                        storm={20}
                        uv={3}
                      />
                    </div>
                    <ListWeather
                      data={weatherState.forecast.map((item) => ({
                        title: item.title,
                        temperatureOne: item.temp_max,
                        temperatureTwo: item.temp_min,
                        icon: <Sun height={50} width={50} />,
                      }))}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default Home;
