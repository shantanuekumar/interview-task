var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const uid = require('uuid/v1');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


var ctrlStore = require('../controllers/storeData');

router.post('/pushData',ctrlStore.store);
  
module.exports = router;


