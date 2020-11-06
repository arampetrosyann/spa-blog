import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { uniqueId } from "lodash";
import { Post } from "../components";
import db from "../libraries/firebase";

function Home() {
  const [posts, setPosts] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong please try again later."
  );

  useEffect(() => {
    const ref = db.database().ref().child("posts");

    ref
      .once("value")
      .then((snap) => {
        const posts = snap.val();

        const arrPosts = Object.values(posts);

        setPosts(arrPosts);
      })
      .catch((error) => {
        setShowErr(true);
      });
  }, []);

  return (
    <>
      <h2 className="home-title">Posts</h2>

      <div className="home-post">
        {showErr ? (
          <p className="post-err">{errorMessage}</p>
        ) : (
          posts.map((post) => {
            return (
              <Post
                key={uniqueId("key_")}
                title={post.title}
                user={post.createdBy}
                content={post.content}
                id={post.id}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default Home;
