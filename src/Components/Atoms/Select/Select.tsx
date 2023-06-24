import React, { useState } from "react";
import styles from "./Select.module.css";

export interface IOption {
  value: string;
  text: string;
}

const Select: React.FC<{
  placeholder: string;
  value: string;
  options: IOption[];
  onChange?: (e: { currentTarget: { value: string } }) => void;
}> = ({ options, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  const onSelected = (selectedValue: string) => {
    onChange?.({
      currentTarget: {
        value: selectedValue,
      },
    });
    setShow(false);
  };
  return (
    <>
      {show && (
        <div
          className={styles["background"]}
          onClick={() => setShow(false)}
        ></div>
      )}
      <div className={styles["container"]}>
        <div
          className={styles["text"]}
          onClick={() => setShow((prev) => !prev)}
        >
          {value === ""
            ? placeholder
            : options.filter((item) => item.value === value)?.[0]?.text ?? ""}
        </div>
        {show && (
          <div className={styles["options"]}>
            {options.length === 0 ? (
              <div className={`${styles["option"]} ${styles["no-pointer"]}`}>
                No data
              </div>
            ) : (
              <>
                {options.map((item, index) => (
                  <div
                    key={index}
                    className={styles["option"]}
                    onClick={() => onSelected(item.value)}
                  >
                    {item.text}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
