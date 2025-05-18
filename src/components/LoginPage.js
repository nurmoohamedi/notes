import React, { useState } from "react";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPageContainer = () => {
  const [panel, setPanel] = useState("login");
//   const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (data.email && data.password) {
      if (panel === "login") {
        const reqData = {
          email: data.email,
          password: data.password,
        };
        console.log(reqData);
        
        dispatch(loginUser(reqData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/home");
        }
        });
      } else {
          console.log("Signup data:", data);
        // Handle signup
        if (data.password !== data["confirm-password"]) {
          alert("Passwords do not match!");
          return;
        }
      }
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off" >
        <h2 className="form-title">
          {panel === "login" ? "Login to your account" : "Create an account"}
        </h2>

        {panel === "login" ? (
          <>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="off"
                autoSave="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>

            <button className="form-button" type="submit">
              Log In
            </button>

            <p className="form-footer">
              Not a member?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setPanel("signup")}
              >
                Sign up now
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="e-mail">Email</label>
              <input
                name="e-mail"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                name="confirm-password"
                type="password"
                required
                placeholder="Please confirm your password"
              />
            </div>

            <button className="form-button" type="submit">
              Sign Up
            </button>

            <p className="form-footer">
              Already have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setPanel("login")}
              >
                Log in
              </button>
            </p>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Loading...</p>}
      </form>
    </div>
  );
};

export default LoginPageContainer;
