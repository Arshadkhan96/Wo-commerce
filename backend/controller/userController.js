const { updateSearchIndex, validate } = require("../models/productModel");
const User = require("../models/userModel")
const CatchError = require('../resources/catcherror')
const tryCatcherror = require('../Middleware/tryCatcherror')
const sendToken = require("../resources/token")
const sendEmail = require("../resources/sendEmail")
const crypto = require('crypto')

exports.registerUser = tryCatcherror(async (req, res, next) => {
    const { name, email, password,role } = req.body;
    const user = await User.create({
        name, email, password,role,
        avatar: {
            public_id: "sample id",
            url: "sample profile url"
        }
    });
    sendToken(user, 201, res)
})


exports.loginUser = tryCatcherror(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(new CatchError("Please enter your email and password", 400));
    }

    // Find the user by email and include the password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new CatchError("Invalid email and password", 401));
    }

    // Compare the provided password with the stored password
    const isMatch = await user.comparePassword(password); // Use the instance method
    if (!isMatch) {
        return next(new CatchError("Invalid email and password", 401));
    }

    sendToken(user, 200, res)

})


exports.logoutUser = tryCatcherror(async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()),httpOnly: true })
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    
})

exports.forgetPassword = tryCatcherror(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new CatchError("There is no account",404))
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is:\n\n\n\n ${resetPasswordUrl} if you are not requested please ignore`

    try{
        await sendEmail({
            email:user.email,
            subject:'Wocommerce password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})
        next(new CatchError(error.message,500))
    }
})


exports.getResetPassword = tryCatcherror(async function(req,res,next){
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    if (!user) {
        return next(new CatchError("Reset Password token is invalid or expire", 400));
    }  
    if (req.body.password !== req.body.confirmPassword) {
        return next(new CatchError("Password doesn't match to Confirm Password", 400));
    }  
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    console.log(req.params.token)
    
    await user.save()
    sendToken(user, 200, res)
})

exports.getUserDetails = tryCatcherror(async (req,res,next)=>{
    const user = await User.findById(req.user.id)
    console.log(user)
    res.status(200).json({
      success:true,
      user
    })
    })


exports.updatePassword=tryCatcherror(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatch){
        return next(new CatchError("Old Password is incorrect",400))
    } 
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new CatchError("Password does not match",400))
    }
    user.password=req.body.newPassword
    await user.save()
    sendToken(user, 200, res)
})

exports.updateProfile=tryCatcherror(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    // We will add cloudinary later 

    const user = await User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success: true,
    });
})

// ################### admin level api ##################################

exports.getAllUsers = tryCatcherror(async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})
// singleUserDetails
exports.singleUserDetails = tryCatcherror(async(req, res,next) => {
    const user=await User.findById(req.params.id)
    if(!user){
      return next(new CatchError("user not found",404))
    }
    res.status(200).json({
      success:true,
      user
    })
  })  

//   deleteUser
exports.deleteUser = tryCatcherror(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new CatchError("user not found",404))
    }
    await user.deleteOne()
    res.status(200).json({
        success:true
    })
})

// UpdateUserRole
exports.updateUserRole=tryCatcherror(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success: true,
    });
})

