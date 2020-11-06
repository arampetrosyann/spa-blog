import React from "react";
import styles from "./Main.module.css";
import PropTypes from "prop-types";

export default function Main({ backColor, children }) {
  return (
    <main className={styles.main} style={{ backgroundColor: backColor }}>
      {children}
    </main>
  );
}

Main.propTypes = {
  backColor: PropTypes.string,
};
