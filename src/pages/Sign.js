import React from "react";
import "../styles/Sign.css";
import icon from "../assets/images/user-sign-icon.png";
import { Input, Submit, Message, Paragraph } from "../components";
import {
  hasAnySpaces,
  containsLetter,
  limitText,
  isValidEmail,
} from "../helpers/validation.helper";
import db from "../libraries/firebase";

class Sign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: "",
      password: "",
      isEmailValid: false,
      isPassValid: false,
      emailErrMessage: null,
      passErrMessage: null,
      showEmailMessage: false,
      showPassMessage: false,
      userEnterErr: null,
      userLog: true,
    };
  }

  handleNameInput = ({ target }) => {
    let message = null;

    let show = false;

    if (hasAnySpaces(target.value)) {
      message = "Whitespace is not allowed!";

      show = true;
    } else if (!containsLetter(target.value)) {
      message = "There are no letters!";

      show = true;
    } else if (!isValidEmail(target.value)) {
      message = "Please enter valid email address.";

      show = true;
    }

    this.setState({
      email: target.value,
      emailErrMessage: message,
      showEmailMessage: show,
      isEmailValid: !show,
    });
  };

  handlePasswordInput = ({ target }) => {
    limitText(target, 20);

    let message = null;

    let show = false;

    if (hasAnySpaces(target.value)) {
      message = "Whitespace is not allowed!";

      show = true;
    } else if (target.value.length < 8) {
      message = "Minimum 8 characters.";

      show = true;
    } else if (!containsLetter(target.value)) {
      message = "There are no letters!";

      show = true;
    }

    this.setState({
      password: target.value,
      passErrMessage: message,
      showPassMessage: show,
      isPassValid: !show,
    });
  };

  handleLogIn = (event) => {
    event.preventDefault();

    if (this.state.isEmailValid && this.state.isPassValid) {
      db.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          window.location.pathname = "/";
        })
        .catch((error) => {
          const errorMessage = "Wrong email or password!";

          this.setState({
            userEnterErr: errorMessage,
          });
        });
    }
  };

  handleSignUp = (event) => {
    event.preventDefault();

    if (this.state.isEmailValid && this.state.isPassValid) {
      db.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          window.location.pathname = "/";
        })
        .catch((error) => {
          const errorMessage = error.message;

          this.setState({
            userEnterErr: errorMessage,
          });
        });
    }
  };

  handleUserLog = () => {
    this.setState((state) => ({
      userLog: !state.userLog,
    }));
  };

  render() {
    return (
      <form className={this.props.className}>
        <div className="form-img-cont">
          <img src={icon} alt="user-sign-icon" width="80px" />
        </div>

        <label htmlFor="name">Email</label>

        <Input
          type="email"
          value={this.state.email}
          name="email"
          holder="Enter Your Email"
          onChange={this.handleNameInput}
        />

        {this.state.showEmailMessage ? (
          <Message text={this.state.emailErrMessage} />
        ) : null}

        <label htmlFor="psw">Password</label>

        <Input
          type="password"
          value={this.state.password}
          name="psw"
          holder="Enter Password"
          onChange={this.handlePasswordInput}
        />

        {this.state.showPassMessage ? (
          <Message text={this.state.passErrMessage} />
        ) : this.state.userEnterErr ? (
          <Message text={this.state.userEnterErr} />
        ) : null}

        {this.state.userLog ? (
          <Submit
            value="Login"
            onClick={this.handleLogIn}
            disabled={
              this.state.isEmailValid && this.state.isPassValid ? false : true
            }
          />
        ) : (
          <Submit
            value="Sign Up"
            onClick={this.handleSignUp}
            disabled={
              this.state.isEmailValid && this.state.isPassValid ? false : true
            }
          />
        )}

        <Paragraph textAlign="right">
          {this.state.userLog
            ? "Don't have an account?"
            : "If you already have an account:"}
          <span className="sign-up" onClick={this.handleUserLog}>
            {this.state.userLog ? "Sign Up" : "Login"}
          </span>
        </Paragraph>
      </form>
    );
  }
}

export default Sign;
