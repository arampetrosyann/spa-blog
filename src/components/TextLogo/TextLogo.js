import React from "react";
import styles from "./TextLogo.module.css";
import PropTypes from "prop-types";

export default function TextLogo({ backColor, title, color, text }) {
  return (
    <span
      className={styles.logo}
      style={{ backgroundColor: backColor }}
      title={title}
    >
      <h1 className={styles.text} style={{ color }}>
        {text}
      </h1>
    </span>
  );
}

TextLogo.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  backColor: PropTypes.string,
};
