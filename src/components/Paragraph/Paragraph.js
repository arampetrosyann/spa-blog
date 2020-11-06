import React from "react";
import styles from "./Paragraph.module.css";
import PropTypes from "prop-types";

export default function Paragraph({ textAlign, children }) {
  return (
    <p className={styles.par} style={{ textAlign }}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  textAlign: PropTypes.string,
};
