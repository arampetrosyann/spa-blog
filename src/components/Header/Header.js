import React from "react";
import styles from "./Header.module.css";
import PropTypes from "prop-types";

import TextLogo from "../TextLogo/TextLogo";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

export default function Header({
  backColor,
  logoText,
  firstBtnText,
  secondBtnText,
}) {
  return (
    <header className={styles.header} style={{ backgroundColor: backColor }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <TextLogo
          text={logoText}
          title="Go To Home Page"
          color="rgb(255, 255, 255)"
          backColor="transparent"
        />
      </Link>
      <Navigation firstBtnText={firstBtnText} secondBtnText={secondBtnText} />
    </header>
  );
}

Header.propTypes = {
  backColor: PropTypes.string,
};
