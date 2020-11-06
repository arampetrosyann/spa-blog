import React from "react";
import styles from "./Submit.module.css";
import PropTypes from "prop-types";

export default function Submit({ value, disabled, onClick }) {
  return (
    <input
      className={styles.submit}
      type="submit"
      value={value}
      disabled={disabled}
      onClick={onClick}
    />
  );
}

Submit.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
