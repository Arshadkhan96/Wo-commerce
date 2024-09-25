const User=require("../models/userModel")

exports.registerUser=async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample id",
            url:"sample profile url"
        }
    });
    const token=user.getJWTToken();
    res.status(201).json({
        success: true,
        token
    });
}

exports.getAllUser = (req, res) => {
    res.status(200).json({ message: "Route is working fine" })
}