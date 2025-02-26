// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { login } from "../../action/userAction";
// // import { Helmet } from "react-helmet";
// // import { useNavigate } from "react-router-dom";   
// // import "./LoginSignUp.css";

// // const LoginSignUp = () => {
// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((state) => state.user);

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const [success, setSuccess] = useState("");
// //   const navigate = useNavigate();  

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       setFormData({
// //         email: JSON.parse(storedUser).email,
// //         password: "",
// //       });
// //     }
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setSuccess("");

// //     dispatch(login(formData.email, formData.password))
// //       .then(() => {
// //         // Save the user information to localStorage
// //         localStorage.setItem("user", JSON.stringify({ email: formData.email }));

// //         setSuccess("User login successfully!");

// //         navigate("/home");

// //         setFormData({
// //           email: "",
// //           password: "",
// //         });
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     setFormData({
// //       email: "",
// //       password: "",
// //     });
// //     setSuccess("User logged out successfully!");
// //   };

// //   return (
// //     <div className="container">
// //       <div className="SignUp">
// //         <Helmet>
// //           <title>SIGN-UP</title>
// //           <meta name="login" content="SignUpUser" />
// //         </Helmet>
// //         <h1>Login User</h1>

// //         {/* Check if the user is logged in and show logout button */}
// //         {localStorage.getItem("user") ? (
// //           <div>
// //             <p>You are already logged in!</p>
// //             <button onClick={handleLogout}>Logout</button>
// //           </div>
// //         ) : (
// //           <form onSubmit={handleSubmit}>
// //             {error && <p style={{ color: "red" }}>{error}</p>}
// //             {success && <p style={{ color: "green" }}>{success}</p>}

// //             <div>
// //               <label>Email:</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label>Password:</label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" disabled={loading}>
// //               {loading ? "Logging in..." : "Login"}
// //             </button>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginSignUp;
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../action/userAction";
// import { useAlert } from "reactjs-alert"
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../layout/loader/Loader";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    if (avatar) myForm.append("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(file);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = new URLSearchParams(location.search).get("redirect") || "/home";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (!switcherTab.current || !registerTab.current || !loginTab.current) return;

    switcherTab.current.classList.toggle("shiftToRight", tab === "register");
    switcherTab.current.classList.toggle("shiftToNeutral", tab === "login");
    registerTab.current.classList.toggle("shiftToNeutralForm", tab === "register");
    loginTab.current.classList.toggle("shiftToLeft", tab === "register");
  };

  return (
    <Fragment>
      <Helmet>
          <title>SIGN-UP</title>
          <meta name="login" content="SignUpUser" />
        </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/forgotPassword">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                <div className="signUpName">
                  <FaceIcon />
                  <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
