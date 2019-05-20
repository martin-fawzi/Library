var cloudantCred = {
 "apikey": "inI9E72SKsJadZck-4Uc6qC4HUijtfbrjZTSNO9dqouY",
  "host": "a4c2705a-8113-48dd-bdb3-b1fb0dfb8466-bluemix.cloudantnosqldb.appdomain.cloud",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloudantnosqldb:eu-gb:a/defaa95f4755780938cc6af7ae8fe877:d34d0d32-0c36-4f53-b063-4cdc117d61ae::",
  "iam_apikey_name": "auto-generated-apikey-4f0e9cd0-9330-4038-ac35-ca74be87d8a6",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/defaa95f4755780938cc6af7ae8fe877::serviceid:ServiceId-e23d2de4-0434-49f4-a974-1394c4f569f1",
  "password": "bacce77ccc6a328504ed9dd182abf6b8ef7f553a4a6b8fb268872dc16a4db481",
  "port": 443,
  "url": "https://a4c2705a-8113-48dd-bdb3-b1fb0dfb8466-bluemix:bacce77ccc6a328504ed9dd182abf6b8ef7f553a4a6b8fb268872dc16a4db481@a4c2705a-8113-48dd-bdb3-b1fb0dfb8466-bluemix.cloudantnosqldb.appdomain.cloud",
  "username": "a4c2705a-8113-48dd-bdb3-b1fb0dfb8466-bluemix"
};

var express = require('express');
var app = express();
var path = require('path');
var cfenv = require('cfenv');
var cloudant = require("@cloudant/cloudant")(cloudantCred.url);
var mydb = cloudant.db.use("user");
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
	res.location('/');
	res.redirect('/');
});

app.get('/register.html', (req,res) => {
	res.location('/register.html');
	res.redirect('/register.html');
});

app.get('/login.html', (req,res) => {
	res.location('/login.html');
	res.redirect('/login.html');
});

app.get('/logout', (req,res) => {
	res.location('/');
	res.redirect('/');
});

app.post('/register.html', (req, res) => {
	var id = req.body.InputID;
	var firstName = req.body.first_name;
	var lastName = req.body.last_name ;
	var email = req.body.inputEmail;
	var password = req.body.inputPassword;
	var department = req.body.department;
	var level = req.body.level;

	mydb.insert({
		_id			: id,
		firstName 	: firstName,
		lastName	: lastName,
		email		: email,
		password	: password,
		department	: department,
		level		: level
	});
	res.location('/booking.html');
	res.redirect('/booking.html');
});


app.post('/login.html', function(req, res) {
    var logEmail = req.body.inputEmail;
    var logPassword = req.body.inputPassword;

    mydb.get(logEmail, (err, body) => {
		  	if (body.password == logPassword) {
            res.location('/booking.html');
            res.redirect('/booking.html');
        }else {
            res.location('/login.html');
            res.redirect('/login.html');    
        }
    });
});


var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});


/*
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
*/


/*



((((((((((Databasa))))))))))
var visitors;
var dbRev = "";
var log = "";

var updateVisitors = () => {
	
	var updateData = {
    		"_id": "visitors",
        	value: visitors    	
	};
	
	if (dbRev !== "")
		updateData["_rev"] = dbRev;
		
	mydb.insert(updateData,
    	(err, body) => {
    		if (err === undefined)
    			dbRev = body["rev"];
    		else
    			log += "updateVisitors: " + err + "<br/>";
    	}
    );
};

// Read the visitors data structure. 
mydb.get("visitors", (err, body) => {
	
	// No visitors yet, create it.
    if (err !== null && err.statusCode === 404) {
    	visitors = {"Test user": {arrived: Date.now().valueOf()}};
    	updateVisitors();
	} else {
		visitors = body.value;
		dbRev = body["_rev"];
	}

});
*/


