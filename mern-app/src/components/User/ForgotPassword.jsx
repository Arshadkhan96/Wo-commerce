import React, { useState, useEffect, useCallback } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../action/userAction";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify"; // ✅ Use react-toastify (Optional)
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const forgotPasswordState = useSelector((state) => state.forgotPassword || {}); // ✅ Prevent undefined error
const { error, message, loading } = forgotPasswordState;
const dispatch = useDispatch();
const [email, setEmail] = useState("");

  // ✅ Using useCallback to prevent unnecessary re-renders
  const forgotPasswordSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    },
    [dispatch, email]
  );

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" }); // ✅ Toast notification
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message, { position: "top-right" });
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input type="submit" value="Send" className="forgotPasswordBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
