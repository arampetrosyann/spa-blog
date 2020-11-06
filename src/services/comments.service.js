import firebase from "../libraries/firebase";

const getComments = (id) => {
  let result = {};

  const refComms = context.database().ref().child("comments");

  refComms.once("value").then((snap) => {
    const comments = snap.val();

    const arrComs = Object.values(comments);

    const filteredComments = arrComs.filter((comment) => {
      return comment.forID === id;
    });

    result = filteredComments;
  });

  return result;
};

export const createComment = (content, forID) => {
  const commId;

  const ref = firebase.database().ref("/comments/" + commId);

  const userEmail = firebase.auth().currentUser.email;

  ref.set({
    content: content.trim(),
    createdBy: userEmail,
    forID,
    id: commId,
  });
};

export const deleteComment = (id) => {
  const ref = firebase.database().ref("/comments").child(id);

  ref.remove();
};

export default getComments;
