const tryCatcherror = require("./tryCatcherror");
const CatchError = require("../resources/catcherror");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

exports.isAuthenticated = tryCatcherror(async (req, res, next) => {
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        return next(new CatchError("Please login to access this resource", 401))
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(verifyToken.id)
    next()
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new CatchError(`Role:${req.user.role} not allowed to access`))
        }
        next()
    }
}