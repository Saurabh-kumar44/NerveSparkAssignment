var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import car from '../models/carSchema';
import user from '../models/userModel';

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

/* GET home page. */
// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.identifierId;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized.' });
  }
};

//done
router.get('/allCarUser', auth, async (req, res) => {
  try {
    const id = req.userId;
    const user= await User.findOne({ user_id:id}); 
     vehicle_ids = user.vehicle_info;
     carInfo  = await car.find({ car_id: { $in: vehicle_ids} }).select("car_info");
    
    return res.status(200).json({carInfo})
  } catch (err) {
    throw new Error("An error occurred while fetching vehicle info.");
  }
});

 router.get('/alldealerShipCarUser', auth, async (req, res) => {
  try {
    let data;
      // Find user by ID
    const id = req.userId;
    const user = await User.findOne({ user_id:id});

     
      if (!User) {
        return res.status(404).send({ error: 'Data not found.' });
      }
      
      // Send response with user profile information
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
 });

 router.get('/alldealershipSpecificCarUser', auth, async (req, res) => {
  try {
    let data;
      // Find user by ID
      data = await User.findById(req.user.userId);
     
      if (!User) {
        return res.status(404).send({ error: 'Data not found.' });
      }
      
      // Send response with user profile information
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
 });

 //done
 router.get('/ownedCarUser', auth, async (req, res) => {
    try {
      const id = req.userId;
      const user= await User.findOne({ user_id:id}); 
       vehicle_ids = user.vehicle_info;
       carNames  = await car.find({ car_id: { $in: vehicle_ids} }).select("name");
      
      return res.status(200).json({carNames})
    } catch (err) {
      throw new Error("An error occurred while fetching vehicle info.");
    }
 });

 router.get('/dealerShipLocationUser', auth, async (req, res) => {
  try {
    let data;
      // Find user by ID
      data = await User.findById(req.user.userId);
     
      if (!User) {
        return res.status(404).send({ error: 'Data not found.' });
      }
      
      // Send response with user profile information
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
 });

 router.get('/certainCarDealUser', auth, async (req, res) => {
  try {
    let data;
      // Find user by ID
      data = await User.findById(req.user.userId);
     
      if (!User) {
        return res.status(404).send({ error: 'Data not found.' });
      }
      
      // Send response with user profile information
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
 });

 router.post('/buyCarUser', auth, async (req, res) => {
  try {
    let data;
      // Find user by ID
      data = await User.findById(req.user.userId);
     
      if (!User) {
        return res.status(404).send({ error: 'Data not found.' });
      }
      
      // Send response with user profile information
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
 });







module.exports = router;
