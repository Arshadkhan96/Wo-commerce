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
    rating:{
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
     reviews:{
        type:String,
        required:[true,"Please Enter product reviews"]
     }
})


module.exports = mongoose.model("Product",productSchema)