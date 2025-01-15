const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,"Please Enter your address"],
        },
        city:{
            type:String,
            required:[true,"Please Enter your city"],
        },
        state:{
            type:String,
            required:[true,"Please Enter your city"],
        },
        country:{
            type:String,
            required:[true,"Please Enter your country"],
        },
        pincode:{
            type:Number,
            required:[true,"Please Enter city pincode"],
        },
        phoneNo:{
            type:Number,
            required:[true,"Please Enter your number"],
        },
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true,
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
    },
    paidAt:{
        type:Date,
        default:0
    },
    itemPrice:{
        type:Number,
        default:0
    },
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:"processing"
    },
    deliverAt:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("order",orderSchema);