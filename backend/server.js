

require('dotenv').config();

var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var utils =require('./utils.js');

var app = express();
var port = process.env.PORT || 4000;

const userData = {
  userId: "789789",
  password: "123456",
  name: "Clue Mediator",
  username: "raquelhn",
  isAdmin: true,
  policyData:{
      "compulsory_excess": 100,
      "voluntary_excess": 100,
      "address": {
        "line_1": "Flat 1, 11 The Street",
        "line_2": "Little Hampton",
        "line_3": "Burton-on-the-water",
        "county": "Avon",
        "city": "Stroud",
        "country": "GB",
        "postcode": "W53TR"
      },
      "usage": "SDP",
      "cover": "Comprehensive",
      "auto_renew": true,
      "start_date": 1599567165,
      "end_date": 1599567165,
      "billing_day_date": 20,
      "underwriter": "Zurich",
      "underwriter_ref": "AXABM000001",
      "product_name": "PBMYD",
      "policy_year": 1,
      "created_at": 1599567165,
      "policy_ref": "apple-orange-pear"
    },
    "proposer": {
      "title": "003",
      "first_names": "Dave",
      "last_names": "Jones",
      "email": "dave@jones.com",
      "mobile_number": "+447999000011",
    }  
};



// enable CORS
app.use(cors());
// parse application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json())

 
app.listen(port, () => {
    console.log('Server started on: ' + port);
});

// validate the user credentials
app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;
   
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password is required."
      });
    }
   
    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is wrong."
      });
    }
    const token = utils.generateToken(userData);
  // get basic user details
    const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });
});

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
   
      // return 401 status if the userId does not match.
      if (user.userId !== userData.userId) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });

  //middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
   
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });
   
  // request handlers
  app.get('/content', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
  });
