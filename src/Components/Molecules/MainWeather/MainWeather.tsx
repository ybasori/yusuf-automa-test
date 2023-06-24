import React from "react";
import styles from "./MainWeather.module.css";
import Button from "../../Atoms/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { saveCity } from "../../../Domain/savedData/savedData.reducer";

const MainWeather: React.FC<{
  temperatureOne: number;
  temperatureTwo: number;
  temperatureThree: number;
  temperatureFour: number;
  title: string;
  icon: React.ReactNode;
}> = ({
  temperatureOne,
  temperatureTwo,
  temperatureThree,
  temperatureFour,
  title,
  icon,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { city: cityState, savedData: savedDataState } = useSelector(
    (state: RootState) => ({
      city: state.city,
      savedData: state.savedData,
    })
  );
  return (
    <>
      <div className={styles["today-weather"]}>
        <div className={styles["detail-weather"]}>
          <div className={styles["temperature"]}>
            <div className={styles["temperature-main"]}>
              {temperatureOne} <sup>o</sup>
            </div>
            <div className={styles["temperature-below"]}>
              <span className={styles["temperature-left"]}>
                {temperatureTwo} <sup>o</sup>
              </span>{" "}
              <span className={styles["temperature-sparator"]}>/</span>{" "}
              <span className={styles["temperature-right"]}>
                {temperatureThree} <sup>o</sup>
              </span>
            </div>
          </div>
          <div className={styles["weather"]}>
            {icon}
            <div className={styles["weather-container"]}>
              <div className={styles["space"]}>&nbsp;</div>
              <div className={styles["weather-text"]}>
                RealFeel<sup>&reg;</sup>{" "}
                <span className={styles["weather-temperature"]}>
                  {temperatureFour}
                  <sup>o</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["describe-weather"]}>{title}</div>
        <div className={styles["action"]}>
          {savedDataState.data.filter(
            (item) => item.name === cityState.city?.name
          ).length > 0 ? (
            <Button disabled={true}>Saved!</Button>
          ) : (
            <Button
              onClick={() => {
                if (cityState.city) {
                  dispatch(saveCity(cityState.city));
                }
              }}
              disabled={false}
            >
              Save!
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MainWeather;
