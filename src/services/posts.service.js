import firebase from "../libraries/firebase";
import nextId from "react-id-generator";

const getPosts = async () => {
  const ref = firebase.database().ref().child("posts");

  return ref
    .once("value")
    .then((snap) => {
      const posts = snap.val();

      const arrPosts = Object.values(posts);

      return arrPosts;
    })
    .catch((error) => {
      return null;
    });
};

export const getPost = (id) => {
  let result = {};

  const ref = firebase.database().ref("posts/" + id);

  ref.once("value").then((snap) => {
    const data = snap.val();

    result = data;
  });

  return result;
};

export const createPost = (title, content) => {
  const postId;

  const ref = firebase.database().ref("posts/" + postId);

  const userEmail = firebase.auth().currentUser.email;

  ref.set({
    title: title.trim(),
    content: content.trim(),
    createdBy: userEmail,
    id: postId,
  });
};

export const updatePost = (id, text) => {
  const ref = firebase.database().ref("/posts").child(id);

  ref.update({ content: text });
};

export const deletePost = (id) => {
  const ref = firebase.database().ref("/posts").child(id);

  ref.remove();
};

export default getPosts;
