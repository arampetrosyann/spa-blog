import React from "react";
import "./styles/App.css";
import { Header, Main, Footer } from "./components";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "./libraries/firebase";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        firebase.auth().currentUser ? children : <Redirect to="/sign" />
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header
          logoText="Blog"
          firstBtnText="Create Post"
          secondBtnText="Log In"
          backColor="rgb(68, 48, 128)"
        />
        <Main backColor="rgb(255, 255, 255)">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/sign">
              <Sign className="sign" />
            </Route>
            <PrivateRoute path="/create-post">
              <CreatePost />
            </PrivateRoute>
            <PrivateRoute path="/:id">
              <SinglePost />
            </PrivateRoute>
          </Switch>
        </Main>
        <Footer text="All Rights Reserved" backColor="rgb(68, 48, 128)" />
      </Router>
    </div>
  );
}

export default App;
