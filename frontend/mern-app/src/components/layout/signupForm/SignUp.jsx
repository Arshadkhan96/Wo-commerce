import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../action/userAction";
import "./signup.css"
import { Helmet } from "react-helmet";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); // Redux state for error/loading

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Optional field
  });

  const [success, setSuccess] = useState(""); // Local success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(""); // Reset success message on new submission
    dispatch(registerUser(formData)) // Dispatch Redux action
      .then(() => {
        setSuccess("User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((err) => {
        console.error(err); // Log error for debugging
      });
  };

  return (
    <div className="Signup">
      <Helmet>
        <title>Register User</title>
        <meta name="register" content="Register new user" />
      </Helmet>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Role (Optional):
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
