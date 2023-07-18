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


const authForAll = async(password,data) =>{
  const validPassword = await bcrypt.compare(password, data.password);
  const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET);
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
    let authToken
    if(!user && !dealership){
     authToken = authForAll(password,admin);
    }

    res.cookie('token', authToken, { httpOnly: true });
     res.redirect('/admin');

    // Find user by email
    const User = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password.' });
    }

    // Check if user is an admin
    if(user.isAdmin){
      // Compare admin password hash
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).send({ error: 'Invalid email or password.'});
      }

      // Generate JWT token for admin user
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Redirect to the admin profile page with the jwt token
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/admin');
    } else {
      // Compare regular user password hash
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).send({ error: 'Invalid email or password.' });
      }

      // Generate JWT token for regular user
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Redirect to the regular user profile page with the jwt token
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/index');
    }
  } catch (err) {
    // Handle any errors that occur during login
    res.status(500).send();
  }
});

// Export the router module for use in other files
module.exports = router;