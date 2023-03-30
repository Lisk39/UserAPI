var express = require('express');

var dbAPI = require('../DBAPI/db.js');
var router = express.Router();

var userMethods = require('../APILibrary/userAPI');

var client = dbAPI.client;

/* GET users default */
router.get('/', function(req, res, next) {
  res.send('Hello World User');
});


/* GET users email check */
router.post('/email', async function(req, res, next) {
  const email = req.body;
  
  try{
    let found = await userMethods.verifyEmail(client, email);
    
    res.json(found);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
  


});
/* GET users password check */
router.post('/password', async function(req, res, next) {
  const password = req.body;
  console.log(password);
  try{
    let user = await userMethods.verifyPass(client, password);
    
    res.json(user);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }


});


/* POST create user */
router.post('/adduser', async function(req, res, next) {
  
 const userData = req.body;
  
  try{
    let user = await userMethods.addUser(client, userData);
   
    res.json(user);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
  
});

module.exports = router;
