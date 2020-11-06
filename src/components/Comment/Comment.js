import React from "react";
import styles from "./Comment.module.css";
import PropTypes from "prop-types";

import { MdDelete } from "react-icons/md";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import db from "../../libraries/firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 30,
    color: "rgb(52, 73, 94)",
  },
}));

export default function Comment({ email, text, id, onDelete }) {
  const classes = useStyles();

  const handleDeleteBtn = () => {
    const ref = db.database().ref("/comments/" + id);

    ref.remove().then((data) => {
      if (onDelete) {
        onDelete(id);
      }
    });
  };

  return (
    <div className={styles.comment}>
      <span className={styles.user}>
        {new Date().getDate()}-{new Date().getFullYear()} by {email}
      </span>
      <pre className={styles.text}>{text}</pre>
      {db.auth().currentUser.email === email ? (
        <div className={styles.but}>
          <IconButton
            aria-label="delete"
            className={classes.button}
            onClick={handleDeleteBtn}
          >
            <MdDelete />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}

Comment.propTypes = {
  email: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDelete: PropTypes.func,
};
