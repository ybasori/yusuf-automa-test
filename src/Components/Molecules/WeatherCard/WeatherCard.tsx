import React from "react";
import styles from "./WeatherCard.module.css";
import { IDataWeather } from "./WeatherCard.type";

const WeatherCard: React.FC<{ data: IDataWeather }> = ({ data }) => {
  return (
    <div className={styles["weather-card"]}>
      <div className={styles["weather-card-head"]}>{data.title}</div>
      <div className={styles["weather-card-body"]}>
        <div className={styles["weather-card-describe"]}>
          {data.icon}
          <div className={styles["weather-card-temperature"]}>
            <div className={styles["weather-one"]}>
              {data.temperatureOne}
              <sup>o</sup>
            </div>
            <div className={styles["weather-two"]}>
              {data.temperatureTwo}
              <sup>o</sup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
