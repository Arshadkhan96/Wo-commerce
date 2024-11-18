const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]
    },
    model:{
        type:String,
        required:[true,"Please Enter product model"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product price"],
        maxLength:[8, "Price can not exceed 8 Character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
         {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
         }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product category"],
     },
     stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4, "Price can not exceed 4 Character"]
     },
     brand:{
        type:String,
        required:[true,"Please Enter product brand"]
     },
     numberOfReviews:{
        type:Number,
        default:0
     },
     reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
     ]
        
})

module.exports = mongoose.model("Product",productSchema)



