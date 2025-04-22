import React from "react";
import "./css/Signup.css";
import auth from "../../assets/authorization.png";
import Input from "../atoms/Input";
import RedInputBtn from "../atoms/RedInputBtn";
import SecInputBtn from "../atoms/SecInputBtn";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import PrimaryRedBtn from "../atoms/PrimaryRedBtn";

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit fucntion");
    console.log(userData);
    e.preventDefault();
    if (!userData.firstName) {
      setErrorMessage((prev) => ({
        ...prev,
        firstName: "First Name is Required",
      }));

      return;
    }
    if (!userData.lastName) {
      setErrorMessage((prev) => ({
        ...prev,
        lastName: "Last Name is Required",
      }));
      return;
    }
    // if (
    //   userData.password.length < 8 &&
    //   userData.password === userData.confirmPassword
    // ) {
    //   alert("Password must be at least 8 characters long and must be same");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-up",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }
      );
      console.log("Signup Successfull:", response.data);
      alert("Signed up successfully!");
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrorMessage({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div id="signup">
      <div className="signup-left">
        <img src={auth} alt="Authorization Illustration" id="signup-cars" />
      </div>

      <div className="signup-right">
        <h1>Create an account</h1>
        <p className="text">Enter your details below to get started</p>

        <form onSubmit={handleSubmit} method="post" id="signup-form">
          <div className="form-group">
            <Input
              width="50%"
              label_head="Name"
              type="text"
              error_message={errorMessage.firstName}
              name="firstName"
              id="f_name"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="Write your Name"
            />
            <Input
              width="50%"
              label_head="Surname"
              type="text"
              error_message={errorMessage.lastName}
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
            onChange={handleChange}
            value={userData.email}
            placeholder="Write your email"
          />
          <Input
            label_head="Password"
            type="password"
            name="password"
            error_message={errorMessage.password}
            onChange={handleChange}
            value={userData.password}
            placeholder="Create password"
          />
          <div className="text">
            Minimum 8 characters with at least one capital letter and one digit
          </div>
          <Input
            label_head="Password"
            type="password"
            name="confirmPassword"
            error_message={errorMessage.confirmPassword}
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
