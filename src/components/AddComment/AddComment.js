import React, { useState } from "react";
import styles from "./AddComment.module.css";
import PropTypes from "prop-types";

import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import db from "../../libraries/firebase";

const useStyles = makeStyles((theme) => ({
  commField: {
    width: "100%",
    margin: "4px 0",
    boxSizing: "border-box",
  },
  addBtn: {
    width: "100%",
  },
}));

export default function AddComment({ forID, onCreate }) {
  const [content, setContent] = useState("");
  const classes = useStyles();

  const handleCommentInput = ({ target: { value } }) => {
    setContent(value);
  };

  const handleAddComment = () => {
    const commId = uuidv4();

    const ref = db.database().ref("/comments/" + commId);

    const userEmail = db.auth().currentUser.email;

    ref
      .set({
        content: content.trim(),
        createdBy: userEmail,
        forID,
        id: commId,
      })
      .then(() => {
        if (onCreate) {
          onCreate(commId);
        }
      });

    setContent("");
  };

  return (
    <div className={styles.com}>
      <TextField
        value={content}
        onChange={handleCommentInput}
        label="Comment"
        variant="outlined"
        rows={4}
        className={classes.commField}
        placeholder="..."
        multiline
      />
      <div>
        <Button
          variant="outlined"
          size="large"
          className={classes.addBtn}
          onClick={handleAddComment}
          disabled={content.trim() === ""}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

AddComment.propTypes = {
  forID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCreate: PropTypes.func,
};
