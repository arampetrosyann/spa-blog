import React from "react";
import styles from "./Post.module.css";
import PropTypes from "prop-types";

import userLogo from "../../assets/images/user-icon.png";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "rgb(52, 73, 94)",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
}));

export default function Post({ title = "", user, content = "", id }) {
  const classes = useStyles();

  return (
    <div className={styles.post}>
      <div className={styles.head}>
        <img src={userLogo} alt="user icon" style={{ width: "80px" }} />
        <div>
          <h3 className={styles.pt}>{title}</h3>
          <span className={styles.uh}>{user}</span>
        </div>
      </div>
      <pre className={styles.pc}>
        {content.length > 197 ? content.substring(0, 197) + "..." : content}
      </pre>
      <div className={styles.pb}>
        <Link to={`/${id}`}>
          <Button variant="text" size="large" className={classes.button}>
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  user: PropTypes.string,
  content: PropTypes.string,
};
