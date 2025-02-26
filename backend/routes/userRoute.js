const express=require('express')
const { registerUser,loginUser,logoutUser,forgetPassword,getResetPassword,getUserDetails, updatePassword, updateProfile,getAllUsers,singleUserDetails, updateUserRole, deleteUser } = require('../controller/userController')
const { isAuthenticated,authorizeRoles } = require('../Middleware/authenticate')

const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser )
router.route("/password/forget").post(forgetPassword)
router.route("/password/reset/:token").put(getResetPassword)
router.route("/logout").get(logoutUser)
router.route("/me/update").put(isAuthenticated,updateProfile)
router.route("/me").get(isAuthenticated,getUserDetails)
router.route("/password/update").put(isAuthenticated,updatePassword)
router.route("/admin/users").get(isAuthenticated,authorizeRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticated,authorizeRoles("admin"),singleUserDetails)
.put(isAuthenticated,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticated,authorizeRoles("admin"),deleteUser)





module.exports=router;
