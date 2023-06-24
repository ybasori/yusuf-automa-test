import React from "react";
import styles from "./ListWeather.module.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { IDataWeather } from "../WeatherCard/WeatherCard.type";

const ListWeather: React.FC<{ data: IDataWeather[] }> = ({ data }) => {
  return (
    <>
      <div className={styles["future-weather"]}>
        {data.map((item, index) => (
          <WeatherCard key={index} data={item} />
        ))}
      </div>
    </>
  );
};

export default ListWeather;
