import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

export default function Input({ type, value, name, holder, onChange }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      name={name}
      placeholder={holder}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  holder: PropTypes.string,
  onChange: PropTypes.func,
};
