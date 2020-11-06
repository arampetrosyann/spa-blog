import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import db from "../../libraries/firebase";

const useButtonStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    color: "rgb(255,255,255)",
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
}));

export default function Navigation({ firstBtnText, secondBtnText }) {
  const [isAuth, setIsAuth] = useState(false);
  const classes = useButtonStyles();

  const navStyle = {
    textDecoration: "none",
  };

  useEffect(() => {
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [isAuth]);

  const handleUserLogOut = () => {
    db.auth().signOut();
  };

  return (
    <nav>
      <ul className={styles.navLinks}>
        <Link to="/create-post" style={navStyle}>
          <li>
            <Button variant="outlined" size="large" className={classes.button}>
              {firstBtnText}
            </Button>
          </li>
        </Link>
        <Link to={isAuth ? "/" : "/sign"} style={navStyle}>
          <li>
            {isAuth ? (
              <Button
                variant="text"
                size="large"
                className={classes.button}
                onClick={handleUserLogOut}
              >
                Log Out
              </Button>
            ) : (
              <Button variant="text" size="large" className={classes.button}>
                {secondBtnText}
              </Button>
            )}
          </li>
        </Link>
      </ul>
    </nav>
  );
}
