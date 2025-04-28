import React, { useEffect, useReducer, useState } from "react";
import ImageAuth from "../atoms/Authentication/ImageAuth";
import Input from "../atoms/Authentication/Input";
import PasswordInput from "../atoms/Authentication/PasswordInput";
import RedInputBtn from "../atoms/RedInputBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/login.css";
import { useAuth } from "../../context/auth/useAuth";
import { useAlert } from "../../context/alert/useAlert";
import AlertBox from "../../context/alert/AlertBox";

interface UserData {
  email: string;
  password: string;
}

interface ErrorMessages {
  email: string;
  password: string;
}

interface BorderColor {
  email: string;
  password: string;
}

interface SigninState {
  userData: UserData;
  errorMessage: ErrorMessages;
  borderColor: BorderColor;
}

type Action =
  | { type: "UPDATE_FIELD"; field: keyof UserData; value: string }
  | { type: "SET_ERROR"; field: keyof ErrorMessages; value: string }
  | { type: "SET_BORDER_COLOR"; field: keyof BorderColor; value: string }
  | { type: "RESET_ERRORS" }
  | { type: "RESET_FORM" };

const initialState: SigninState = {
  userData: {
    email: "",
    password: "",
  },
  errorMessage: {
    email: "",
    password: "",
  },
  borderColor: {
    email: "gray",
    password: "gray",
  },
};

const reducerLogin = (state: SigninState, action: Action): SigninState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        userData: { ...state.userData, [action.field]: action.value },
      };

    case "SET_ERROR":
      return {
        ...state,
        errorMessage: { ...state.errorMessage, [action.field]: action.value },
      };

    case "SET_BORDER_COLOR":
      return {
        ...state,
        borderColor: { ...state.borderColor, [action.field]: action.value },
      };

    case "RESET_ERRORS":
      return {
        ...state,
        errorMessage: initialState.errorMessage,
        borderColor: initialState.borderColor,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const Login = () => {
  const location = useLocation();
  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Add a loading state to handle the button state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      location.state?.alertType &&
      location.state?.alertTitle &&
      location.state?.alertDescription
    ) {
      showAlert(
        location.state.alertType,
        location.state.alertTitle,
        location.state.alertDescription
      );
    }
  }, [location.state]);

  const [state, dispatch] = useReducer(reducerLogin, initialState);
  const { userData, errorMessage, borderColor } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_FIELD",
      field: name as keyof UserData,
      value: name === "email" ? value.toLowerCase() : value,
    });
  };

  let flagErr: boolean = false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).*$/;

    dispatch({ type: "RESET_ERRORS" });
    setLoading(true); // Set loading to true when submitting

    if (!userData.email) {
      dispatch({
        type: "SET_ERROR",
        field: "email",
        value: "Email is required",
      });
      dispatch({
        type: "SET_BORDER_COLOR",
        field: "email",
        value: "red",
      });
      flagErr = true;
    }

    if (!userData.password || !passwordRegex.test(userData.password)) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: !userData.password
          ? "Password is required"
          : "Password must contain at least one uppercase letter and one digit.",
      });
      dispatch({
        type: "SET_BORDER_COLOR",
        field: "password",
        value: "red",
      });
      flagErr = true;
    }

    if (userData.password.length < 8) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: "Password should contain at least 8 characters.",
      });
      dispatch({
        type: "SET_BORDER_COLOR",
        field: "password",
        value: "red",
      });
      flagErr = true;
    }

    if (flagErr) {
      setLoading(false); // Stop loading if there are errors
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-in",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const loginData = {
        username: resp.data.username,
        userId: resp.data.userId,
        role: resp.data.role,
      };
      login(loginData);
      console.log(resp);
      dispatch({ type: "RESET_FORM" });
      navigate("/");
      setLoading(false); // Stop loading after successful login
    } catch (err: any) {
      console.log(err.response);
      setLoading(false); // Stop loading in case of error

      if (err.response.status === 409) {
        dispatch({
          type: "SET_ERROR",
          field: "email",
          value: "Email not registered",
        });
        dispatch({
          type: "SET_BORDER_COLOR",
          field: "email",
          value: "red",
        });
      } else if (err.response.status === 410) {
        dispatch({
          type: "SET_ERROR",
          field: "password",
          value: "The password isn't correct. Check it and try again.",
        });
        dispatch({
          type: "SET_BORDER_COLOR",
          field: "password",
          value: "red",
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div id="login">
      <ImageAuth />

      <div className="login-right">
        {alert && <AlertBox alert={alert} />}
        <div id="head-log-in">Log in</div>
        <p className="text">Glad to see you again</p>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="login-form-group">
            <Input
              label_head="Email"
              type="email"
              name="email"
              error_message={errorMessage.email}
              border={borderColor.email}
              onChange={handleChange}
              value={userData.email}
              placeholder="Write your email"
            />

            <PasswordInput
              label_head="Password"
              type="password"
              name="password"
              error_message={errorMessage.password}
              border={borderColor.password}
              onChange={handleChange}
              value={userData.password}
              placeholder="Write your password"
            />

            {!flagErr && (
              <div className="text">
                Minimum 8 characters with at least one capital letter and one
                digit
              </div>
            )}

            <div className="form-group">
              <RedInputBtn type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading-text">Loading</span>
                ) : (
                  "Login"
                )}
              </RedInputBtn>
            </div>

            <div id="signup-btn">
              New here?{" "}
              <strong>
                <Link to="/signup">Create an account</Link>
              </strong>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
