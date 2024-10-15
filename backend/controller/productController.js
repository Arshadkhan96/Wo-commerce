const Product = require("../models/productModel")
const CatchError = require("../resources/catcherror")
const tryCatcherror=require('../Middleware/tryCatcherror')

exports.createProduct = tryCatcherror(async (req, res, next) => {
  const product = await Product.create(req.body)
  
  res.status(201).json({
    success: true,
    product
})
})

// exports.findProduct = async (req, res, next) => {
  // const findProduct = await Product.find(req.params.id)
  // console.log(req.params.id)
  // // if(!findProduct){
  // //   return next(new CatchError('Product not found',404))
  // // }
  // res.status(200).json({
  //   success:true,
  //   findProduct
  // })
// }
exports.findAllProduct=tryCatcherror(async(req,res)=>{
  const product = await Product.find()
  res.status(200).json({
    success:true,
    product
  })
})

exports.updateProduct=tryCatcherror(async(req,res,next)=>{
  const updateProduct=await Product.updateOne(
  req.params,
  {
      $set:req.body
  }
)
if(!updateProduct){
  return next(new CatchError("product not found",404))
}
res.status(200).json({
  success:true,
  message:"Product updated successfully"
})
})

exports.deleteProduct=tryCatcherror(async(req,res,next)=>{
  const deleteProduct=await Product.deleteOne(req.params)
  if(!deleteProduct){
    return next(new CatchError("product not found",404))
  }
  res.status(200).json({
    success:true,
    message:"Product deleted successfully"
  })
})

exports.findProduct = tryCatcherror(async(req, res,next) => {
  const product=await Product.findById(req.params.id)
  if(!product){
    return next(new CatchError("product not found",404))
  }
  res.status(200).json({
    success:true,
    product
  })
})
