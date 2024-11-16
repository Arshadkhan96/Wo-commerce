import React, { useState } from 'react';
import axios from 'axios'
import './signup.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in the required fields');
    } else {
      setError('');
      setName('');
      setEmail('');
      setPassword('');
    }

    axios.post('http://localhost:5000/api/v1/register',{name,email,password})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  };

  return (
    <>
      <div className='formInputSign'>
        <form onSubmit={handleSubmit} className='formSign'>
          <p>Sign Up to your Account</p>
          {error && <p className="error">{error}</p>}
          <br />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <br />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <br />
          <button type="submit">Signup</button>
          <br /><br />
          <h4>Have an account? / <a href="/login">Login</a></h4>
        </form>
      </div>
    </>
  );
};

export default SignUp;
