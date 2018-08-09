var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});



var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlProduct = require('../controllers/fetch_products');
var ctrlCart = require('../controllers/cart');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// products
router.get('/product', ctrlProduct.fetch_products);
router.post('/cart', ctrlCart.updateCart);
router.get('/cart', auth , ctrlCart.getCart);
  
module.exports = router;
