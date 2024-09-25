const express=require('express')
const { getAllUser, registerUser } = require('../controller/userController')


const router=express.Router()

router.route("/user").get(getAllUser)
router.route("/user/register").post(registerUser)

module.exports=router;
