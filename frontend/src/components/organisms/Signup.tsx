import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Signup.css";
import Input from "../atoms/Authentication/Input";
import RedInputBtn from "../atoms/RedInputBtn";
import SecInputBtn from "../atoms/SecInputBtn";
import PasswordInput from "../atoms/Authentication/PasswordInput";
import SuccessAlert from "../atoms/SuccessAlert";
import ImageAuth from "../atoms/Authentication/ImageAuth";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface BorderColor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [borderColor, setBorderColor] = useState<BorderColor>({
    firstName: "gray",
    lastName: "gray",
    email: "gray",
    password: "gray",
    confirmPassword: "gray",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  let flagErr: boolean = false;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validations
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    // Reset errors
    setErrorMessage({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setBorderColor({
      firstName: "black",
      lastName: "black",
      email: "black",
      password: "black",
      confirmPassword: "black",
    });

    flagErr = false;
    if (!userData.firstName || !nameRegex.test(userData.firstName)) {
      setErrorMessage((prev) => ({
        ...prev,
        firstName: userData.firstName
          ? "Only Latin letters are allowed"
          : "First Name is required",
      }));
      setBorderColor((prev) => ({
        ...prev,
        firstName: "red",
      }));
      flagErr = true;
    }

    if (!userData.lastName || !nameRegex.test(userData.lastName)) {
      setErrorMessage((prev) => ({
        ...prev,
        lastName: userData.lastName
          ? "Only Latin letters are allowed"
          : "Last Name is required",
      }));
      setBorderColor((prev) => ({
        ...prev,
        lastName: "red",
      }));

      flagErr = true;
    }

    if (userData.password.length < 8) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password should contain at least 8 characters.",
      }));
      setBorderColor((prev) => ({
        ...prev,
        password: "red",
      }));
      flagErr = true;
    }

    if (!passwordRegex.test(userData.password)) {
      setErrorMessage((prev) => ({
        ...prev,
        password:
          "Password must contain at least one uppercase letter and one digit.",
      }));
      setBorderColor((prev) => ({
        ...prev,
        password: "red",
      }));
      flagErr = true;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      setBorderColor((prev) => ({
        ...prev,
        confirmPassword: "red",
      }));
      flagErr = true;
    }
    if (flagErr) {
      return;
    }
    try {
      // console.log("Requesting");
      const response = await axios.post(
        "https://car-rental-server-vh0t.onrender.com/api/v1/auth/sign-up",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }
      );
      setShowSuccessAlert(true);

      // alert("Signed up successfully!");

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // setTimeout(() => {
      //   setShowSuccessAlert(false);
      //   navigate("/login");
      // }, 1000);
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 409) {
        setErrorMessage((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
        setBorderColor((prev) => ({
          ...prev,
          email: "red",
        }));
      } else {
        alert("An error occurred during registration.");
        console.error(err);
      }
    }
  };

  return (
    <div id="signup">
      <ImageAuth />

      <div className="signup-right">
        {showSuccessAlert && (
          <SuccessAlert
            id="alertbox"
            message="Congratulations!"
            description="You have successfully created your account!"
          />
        )}
        <div id="head-create-account">Create an account</div>
        <p className="text">Enter your details below to get started</p>
        <form onSubmit={handleSubmit} id="signup-form">
          <div className="form-group">
            <Input
              width="50%"
              label_head="Name"
              type="text"
              error_message={errorMessage.firstName}
              border={borderColor.firstName}
              name="firstName"
              id="f_name"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="Write your name"
            />
            <Input
              width="50%"
              label_head="Surname"
              type="text"
              error_message={errorMessage.lastName}
              border={borderColor.lastName}
              name="lastName"
              id="l_name"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Write your surname"
            />
          </div>

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
            placeholder="Create password"
          />

          {!flagErr && (
            <div className="text">
              Minimum 8 characters with at least one capital letter and one
              digit
            </div>
          )}

          <PasswordInput
            label_head="Confirm Password"
            type="password"
            name="confirmPassword"
            error_message={errorMessage.confirmPassword}
            border={borderColor.confirmPassword}
            onChange={handleChange}
            value={userData.confirmPassword}
            placeholder="Confirm password"
          />

          <div className="form-group">
            <SecInputBtn value="Cancel" />
            <RedInputBtn value="Register" type="submit" />
          </div>

          <div id="login-btn">
            Already here?{" "}
            <strong>
              <Link to="/login">Log in</Link>
            </strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
