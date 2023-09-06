// jshint esversion:6
// // jshint esversion: 6
const express = require('express');
const https = require('https');

const app = express();
const port = 2000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
  const apiKey = "MONGODBCONNECTIONURI";
  const email = req.body.email;
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const detailDesign = req.body.details;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          DETAILS: detailDesign
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/ff5c5c44dc";
  const options = {
    method: "POST",
    auth: "TheMeano:1c2b7607a73faae71ac9504f9f989d38-us21"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`);
});

// ff5c5c44dc
// 1c2b7607a73faae71ac9504f9f989d38-us21
