const { updateSearchIndex, validate } = require("../models/productModel");
const User = require("../models/userModel")
const CatchError = require('../resources/catcherror')
const tryCatcherror = require('../Middleware/tryCatcherror')
const sendToken = require("../resources/token")
const sendEmail = require("../resources/sendEmail")

exports.registerUser = tryCatcherror(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
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
    res.cookie("token", null, { expires: new Date(Date.now()) })
    sendToken(user, 200, res)
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

