import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../action/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom"; // ✅ Corrected navigation method
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import { useAlert } from "react-alert"; // Uncomment if installed

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Use navigate instead of history.push()
  // const alert = useAlert(); // Uncomment if using react-alert

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error); // ✅ Debugging error logs
      // alert.error(error); // Uncomment if using react-alert
      dispatch(clearErrors());
    }

    if (isUpdated) {
      console.log("Password updated successfully!"); // ✅ Debugging success logs
      // alert.success("Password Updated Successfully"); // Uncomment if using react-alert

      navigate("/account"); // ✅ Use navigate instead of history.push()

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]); // ✅ Replaced history with navigate

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Change" className="updatePasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
