const cartController=require("../controllers/cartController")
const express=require('express');
const router=express.Router();
const auth=require("../middlewares/auth")
router.post("/",auth,cartController.createCart)

router.get("/",auth,cartController.getCart)
router.delete("/:id",auth,cartController.deleteCart)
// router.get

module.exports=router