import React from "react";
import styles from "./Button.module.css";

const Button: React.FC<{
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ children, type = "button", disabled = false, onClick }) => {
  return (
    <button
      type={type}
      className={styles["btn"]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
