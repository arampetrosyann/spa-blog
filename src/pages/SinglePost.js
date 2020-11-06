import React, { useState, useCallback, useEffect } from "react";
import "../styles/SinglePost.css";
import { findIndex } from "lodash";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import { Comment, AddComment } from "../components";
import db from "../libraries/firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 45,
    color: "rgb(52, 73, 94)",
    textDecorationLine: "underline",
  },
}));

export default function SinglePost() {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const [curPost, setCurPost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const params = useParams();
  const classes = useStyles();

  const handleDeleteBtn = useCallback(() => {
    const ref = db.database().ref("/posts/" + params.id);

    ref.remove();
  }, []);

  const handleEditBtn = useCallback(() => {
    setEdit((prevEdit) => !prevEdit);
  }, []);

  const handleDoneBtn = () => {
    const ref = db.database().ref("/posts").child(params.id);

    ref.update({ content: text });

    setEdit(false);
  };

  const handleTextInput = useCallback(({ target: { value } }) => {
    setText(value);
  }, []);

  useEffect(() => {
    const refPost = db.database().ref("/posts/" + params.id);
    const refComms = db.database().ref().child("comments");

    refPost.once("value").then((snap) => {
      const { title, content, createdBy } = snap.val();

      setCurPost({ title, content, createdBy });

      setText(content);
    });

    refComms
      .once("value")
      .then((snap) => {
        const comments = snap.val();

        const arrComs = Object.values(comments);

        const filteredComments = arrComs.filter((comment) => {
          return comment.forID === params.id;
        });

        setPostComments(filteredComments);
      })
      .catch((error) => {});
  }, []);

  const onDelete = (id) => {
    const index = findIndex(postComments, ["id", id]);

    setPostComments((prevPostComments) =>
      prevPostComments.filter((comment, ind) => {
        return ind !== index;
      })
    );
  };

  const onCreate = useCallback((id) => {
    const ref = db.database().ref("/comments/" + id);

    ref.once("value").then((snap) => {
      const comment = snap.val();

      setPostComments((prevPostComments) => prevPostComments.concat(comment));
    });
  }, []);

  return (
    <>
      <div className="post">
        <div>
          {db.auth().currentUser.email === curPost.createdBy ? (
            <aside className="sidebar">
              <Link to="/">
                <IconButton
                  aria-label="delete"
                  className={classes.button}
                  onClick={handleDeleteBtn}
                >
                  <MdDelete />
                </IconButton>
              </Link>

              <IconButton
                aria-label="edit"
                onClick={handleEditBtn}
                className={classes.button}
              >
                <AiOutlineEdit />
              </IconButton>

              <IconButton
                aria-label="done"
                onClick={handleDoneBtn}
                className={classes.button}
                disabled={text.trim().length < 50}
              >
                <MdDone />
              </IconButton>
            </aside>
          ) : null}
          <h3 className="single-title">{curPost.title}</h3>
          <span className="posted-by">posted by: {curPost.createdBy}</span>
        </div>

        {edit ? (
          <textarea
            rows={24}
            value={text}
            onChange={handleTextInput}
            className="content-area"
          />
        ) : (
          <pre className="content">{text}</pre>
        )}
      </div>

      <AddComment forID={params.id} onCreate={onCreate} />

      <div className="comments">
        {postComments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.content}
              email={comment.createdBy}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </>
  );
}
