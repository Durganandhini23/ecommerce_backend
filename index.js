const express=require("express");
const app=express();
const cors = require('cors');
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
const mongoose=require("mongoose");
app.use(cors())
app.use(express.json());
//mongodb://localhost:27017/e_commerce :mongodb+srv://vdurganandhini:durga1012@cluster0.npvajpd.mongodb.net/e_commerce
mongoose.connect("mongodb://localhost:27017/e_commerce"
).then(()=>{
    console.log("connected to database");
})
app.use("/products",productRoutes)
app.use("/users",userRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)
app.listen(3000,()=>{
    console.log("Server is running in the port 3000");
})