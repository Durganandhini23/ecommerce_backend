const User=require("../models/userModel")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.getUsers=async (req,res)=> {
try{
    const users=await User.find()
    res.send(users);
}catch(err){
    console.error(err);
}
};

exports.createUser=async(req,res)=>{
    const{name,email,password}= req.body;
    const user=new User({
      
       name,
       email,
       password
})
await user.save();
res.status(200).json("User Created Successfully");
}



exports.login=async (req,res) =>{
    const {email, password} = req.body;
    try{
         const user =await User.findOne({email});
         if(!user) {
              return res.status(400).json("Invalid user name or email or password")
         } 
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch) {
            return res.status(400).json("Invlid email or password");
         }
         const token = jwt.sign({ user_id : user._id}, "secret_token", {
            expiresIn: "24hr",
         });
         res.status(200).json(token);
    }catch(err) {
        console.error(err);
        
    }
};