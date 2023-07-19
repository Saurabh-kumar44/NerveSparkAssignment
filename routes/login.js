import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin';
import UserModel from '../models/userModel.js';
import DealershipModel from '../models/dealerShipSchema.js';


// Connect to MongoDB Atlas database
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})


const authForAll = async(password,data,id) =>{
  const validPassword = await bcrypt.compare(password, data.password);
  if(!validPassword)return res.status(400).send("Invalid Credetials");
  const token = jwt.sign({ identifierId: id}, process.env.JWT_SECRET);
  return token;
}


// Handle login form submission
router.post('/', async (req, res) => {
  try {
    const {identifier, password} = req.body;

    if( !email || !password)return res.status(400).send("PLease Enter email or password")
    const user= await UserModel.findOne({ user_email:identifier}); 
    const dealership = await AdminModel.findOne({ dealership_email:identifier});
    const admin = await DealershipModel.findOne({ admin_id:identifier});
    let authToken;
    let redirect;
    let id;
    if(admin){ 
    id = admin.admin_id;
    authToken = authForAll(password,admin,id);
    redirect = admin
    }
    else if(user){
      id = user.user_id;
      authToken = authForAll(password,user);
      redirect = user;
    }
    else if(dealership){
      id = dealership.dealership_id;
      authToken = authForAll(password,user);
      redirect= dealership
    }
    else{
      return res.status(401).send({ error: 'Invalid emai or password.' });
    }

    res.cookie('token', authToken, { httpOnly: true });
    res.redirect(`/${redirect}`);
  } catch (err) {
    // Handle any errors that occur during login
    res.status(500).send();
  }
});

// Export the router module for use in other files
module.exports = router;