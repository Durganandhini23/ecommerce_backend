const productController=require("../controllers/productController")
const express=require('express');
const router=express.Router();
const auth=require("../middlewares/auth")

router.get("/",auth,productController.getProducts)
router.post("/",auth,productController.createProduct)
// router.get

module.exports=router;
