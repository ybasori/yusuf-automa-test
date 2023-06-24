import React from "react";
import styles from "./WeatherForecast.module.css";

const WeatherForecast: React.FC<{
  wind: number;
  rain: number;
  storm: number;
  uv: number;
}> = ({ wind, rain, storm, uv }) => {
  return (
    <>
      <div className={styles["weather-forecast"]}>
        <div className={styles["weather-forecast-item"]}>
          <span className={styles["wfi-title"]}>Wind</span> {wind}
          <span className={styles["metric"]}>Km/h</span> SE
        </div>
        <div className={styles["weather-forecast-item"]}>
          <span className={styles["wfi-title"]}>Rain</span> {rain}
          <span className={styles["metric"]}>mm</span>
        </div>
        <div className={styles["weather-forecast-item"]}>
          <span className={styles["wfi-title"]}>Storm</span> {storm}
          <span className={styles["metric"]}>%</span>
        </div>
        <div className={styles["uv-index"]}>
          <span className={styles["wfi-title"]}>UV</span>{" "}
          <span className={styles["metric"]}>index</span>{" "}
          <span className={styles["uv-value"]}>{uv}</span>
        </div>
      </div>
    </>
  );
};

export default WeatherForecast;
