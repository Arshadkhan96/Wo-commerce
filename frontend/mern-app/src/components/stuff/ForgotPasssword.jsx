import React, { useState } from 'react';
import './stuff.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
    } else {

      setMessage('If an account with that email exists, a password reset link has been sent.');
      setError('');
      setEmail(''); // Clear the input field
    }
  };

  return (
    <div className="formInputForgot">
      <form onSubmit={handleSubmit} className="formForgot">
        <center><p>Forgot Password</p></center>
        <br />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your registered email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <button type="submit">Send Reset Link</button>
        <br /><br />
        <center><h4>Remembered your password? / <a href="/login">Login</a></h4></center>
      </form>
    </div>
  );
};

export default ForgotPassword;
