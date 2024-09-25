const Product = require("../models/productModel")
// const CatchError = require("../resources/catcherror")
const tryCatcherror=require('../Middleware/tryCatcherror')

exports.createProduct = tryCatcherror(async (req, res, next) => {
  const product = await Product.create(req.body)
  if(product){
  res.status(201).json({
    success: true,
    product
  })
}else{
  res.status(404).json({
    success: false,
    message: 'Product creation failed'
})
}
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
exports.findProduct=tryCatcherror(async(req,res)=>{
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
if(updateProduct){
  res.status(200).json({
  success: true,
  message:'Product updated successfully'
});
}else{
  res.status(404).json({
    success: false,
    message: 'Product not found or updated'
  })
}
})

exports.deleteProduct=tryCatcherror(async(req,res,next)=>{
  const deleteProduct=await Product.deleteOne(req.params)
  if(deleteProduct){
    res.status(200).json({
    success: true,
    message:'Product deleted successfully'
  })
  }else{
    res.status(404).json({
      success: false,
      message: 'Product not found or deleted'
    })
  }
})

exports.getAllProducts = (req, res) => {
  res.status(200).json({ message: "Route is working fine" })
}
