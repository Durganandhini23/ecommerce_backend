const userController=require("../controllers/userController")
const express=require('express');
const router=express.Router();

router.post("/login",userController.login)
router.post("/register",userController.createUser)
// router.get

module.exports=router