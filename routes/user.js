var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const Transaction = require('../models/transactionsModel');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized.' });
  }
};


router.get('/', auth, async (req, res) => {
 try {
  let data;
    // Find user by ID
    const user = await User.findById(req.user.userId);
    const transactions = await Transaction.find({ $or: [{ sender_id: user._id }, { receiver_id: user._id }] }).sort({ created_at: 'desc' });
   
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }
    
    // Send response with user profile information
    res.json({data});
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/allCarUser', auth, async (req, res) => {

 });

 router.get('/alldealerShipCarUser', auth, async (req, res) => {
  
 });

 router.get('/alldealershipSpecificCarUser', auth, async (req, res) => {
  
 });

 router.get('/dealerShipLocationUser', auth, async (req, res) => {
  
 });

 router.get('/carDealUser', auth, async (req, res) => {
  
 });

 router.post('/buyCarUser', auth, async (req, res) => {
  
 });







module.exports = router;
