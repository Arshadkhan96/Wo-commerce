import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../action/userAction";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await dispatch(logout()); // Dispatch the logout action
        localStorage.removeItem("user"); // Remove user from localStorage
        console.log("User logged out, redirecting...");
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return
   <div>
    <h1>Hello</h1>
    Logging out...
    </div>;
};

export default LogOut;
