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
    console.log('Example app listening on port 8080!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

app.post("/sentiment", (req, res) => {
    textapi.sentiment({ 'url': req.body.url, 'mode': 'document' }, (error, response) => {
        if (error == null) {
            console.log(response);
            res.send(response)
        } else {
            console.log('there was an error:', error)
        }
    });
});

// alyenAPI.sentiment({
//     'text': 'John is a very good football player!'
// }, function(error, response) {
//     if (error === null) {
//         console.log(response);
//     }
// });