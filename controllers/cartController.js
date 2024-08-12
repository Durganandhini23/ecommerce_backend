const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

exports.createCart = async (req, res) => {
    const { user_id } = req.user

    const { product_id, quantity } = req.body
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
        cart = new Cart({
            user_id,
            products: [
                {
                    product_id,
                    quantity,
                },
            ],
        });
    }
    else {
        const ProductIndex = cart.products.findIndex(
            (prod) => prod.product_id === product_id
        );
        if (!ProductIndex > -1) {
            cart.products[ProductIndex].quantity = quantity;
        } else {
            cart.products.push({ product_id, quantity });
        }
    }
    cart.save();
    res.status(201).json({ message: "Product added/updated in cart", cart });
};

exports.getCart = async (req, res) => {
    const { user_id } = req.user;

    const cart = await Cart.findOne({ user_id })
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }
    try {
        let subTotal = 0;
        const CartItems = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({
                    id: product.product_id
                });
                
                subTotal += productDetails.price * product.quantity;
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity,

                };
            })

        );
        console.log(CartItems)
        res.status(200).json({ CartItems: CartItems, subTotal });

    } catch (err) {
        res.status(500).json({ message: "Server Error", err })
    }
}



// exports.deleteFromCart = async (req, res) => {
//     try {
//       const { user_id } = req.user;
//       const { product_id } = req.body;
  
//       let cart = await Cart.findOne({ user_id });
  
//       if (!cart) {
//         return res.status(404).json({ message: "Cart not found" });
//       }
  
//       const productIndex = cart.products.findIndex(
//         (prod) => prod.product_id === product_id
//       );
  
//       if (productIndex > -1) {
//         cart.products.splice(productIndex, 1);
//         await cart.save();
//         return res.status(200).json({ message: "Product removed from cart", cart });
//       } else {
//         return res.status(404).json({ message: "Product not found in cart" });
//       }
//     } catch (err) {
//       console.error("Error in deleteFromCart:", err);
//       res.status(500).json({ message: "Server Error", err });
//     }
//   };

exports. deleteCart=async(req,res)=>{
    const {userId}=req.user;
    const product_id=req.params.id
    try{
let cart=await Cart.findOne({userId});
if(!cart){
    return res.status(404).json({message:"user not found"})
}
const cartIndex = cart.products.findIndex((product)=>product.product_id === product_id);

if(cart.products.length<=1){
    await Cart.deleteOne({
        userId
    })
    return res.status(200).json({message:"Product deleted from cart"});
}
else{
    cart.products=cart.products.filter((pr)=>
        prod.id!=product_id
    )
    cart.save()
    return res.status(200).json({message:"Product deleted from cart"});
}
     
    }
    catch(err){
        return res.status(401).json({message:"internal server error",err})
    }
}
