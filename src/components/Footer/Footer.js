import React from "react";
import styles from "./Footer.module.css";
import PropTypes from "prop-types";
import Copyright from "../Copyright/Copyright";

export default function Footer({ backColor, text }) {
  return (
    <footer className={styles.footer} style={{ backgroundColor: backColor }}>
      <Copyright text={text} color="rgb(255, 255, 255)" />
    </footer>
  );
}

Footer.propTypes = {
  backColor: PropTypes.string,
  text: PropTypes.string,
};
