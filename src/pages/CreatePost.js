import React, { useState, useCallback } from "react";
import "../styles/CreatePost.css";

import { v4 as uuidv4 } from "uuid";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { limitText } from "../helpers/validation.helper";
import { Link } from "react-router-dom";

import db from "../libraries/firebase";

const useStyles = makeStyles((theme) => ({
  titleField: {
    boxSizing: "border-box",
    margin: 10,
  },

  contentField: {
    boxSizing: "border-box",
    margin: 10,
  },

  button: {
    width: "100%",
    margin: 10,
    borderColor: "rgb(88, 110, 93)",
    backgroundColor: "rgba(37, 75, 125, 0.2)",
  },
}));

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const classes = useStyles();

  const handleTitleInput = useCallback(({ target }) => {
    limitText(target, 40);

    setTitle(target.value);
  }, []);

  const handleContentInput = useCallback(({ target: { value } }) => {
    setContent(value);
  }, []);

  const handleButtonClick = useCallback(() => {
    const postId = uuidv4();

    const ref = db.database().ref("posts/" + postId);

    const userEmail = db.auth().currentUser.email;

    ref.set({
      title: title.trim(),
      content: content.trim(),
      createdBy: userEmail,
      id: postId,
    });
  }, [title, content]);

  return (
    <div className="post">
      <h2 className="post-title">Tell us your story!</h2>

      <TextField
        value={title}
        onChange={handleTitleInput}
        label="Title"
        placeholder="..."
        className={classes.titleField}
      />

      <TextField
        value={content}
        onChange={handleContentInput}
        label="Content"
        variant="outlined"
        rows={14}
        helperText="Minimum 50 characters!"
        className={classes.contentField}
        multiline
      />

      <Link to="/" className="btn-link">
        <Button
          onClick={handleButtonClick}
          variant="outlined"
          size="large"
          className={classes.button}
          disabled={title.trim() === "" || content.trim().length < 50}
        >
          Add
        </Button>
      </Link>
    </div>
  );
}

export default CreatePost;
