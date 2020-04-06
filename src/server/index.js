const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
var aylien = require("aylien_textapi");

var alyenAPI = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

//POST request
app.post('/sentiment', (req, res) => {
    console.log(req.body.url);
    alyenAPI.sentiment({
            url: req.body.url
        },
        (error, response) => {
            if (error === null) {
                console.log(response)
                res.send(response);
            } else {
                console.log(error);
                res.status(500).send("Something went wrong!");
            }

        });
});

// alyenAPI.sentiment({
//     'url': 'https://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile/'
// }, function(error, response) {
//     if (error === null) {
//         console.log(response);
//     } else {
//         console.log('there was an error:', error)
//     }
// });