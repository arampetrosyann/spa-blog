import firebase from "../libraries/firebase";

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const singUpUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const logInUser = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      const errorMessage = "Wrong email or password!";
    });
};

export default getCurrentUser;
