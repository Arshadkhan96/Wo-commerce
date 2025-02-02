import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/userAction";
import { Helmet } from "react-helmet";
import "./LoginSignUp.css";
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    dispatch(login(formData.email, formData.password)) 
      .then(() => {
        setSuccess("User login successfully!");
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  return (
    <div className="container">
    <div className="SignUp">
      <Helmet>
        <title>SIGN-UP</title>
        <meta name="login" content="SignUpUser" />
      </Helmet>
      <h1>Login User</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginSignUp;
