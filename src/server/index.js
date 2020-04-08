const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.post("/sentiment", (req, res) => {
    textapi.sentiment({
            text: req.body.userText,
            mode: "document"
        },
        (error, response) => {
            if (error === null) {
                console.log("Sentiment API: ", response);
                res.send(response);
                console.log(req.body.userText);
            } else {
                console.log(error);
            }
        }
    );
});

app.post("/classify", (req, res) => {
    textapi.classify({
            url: req.body.userUrl
        },

        (error, response) => {
            if (error === null) {
                console.log("Response from Aylien classify API: ", response);
                res.send(response);
            } else {
                console.log(error);
            }
        }

    );
});

// textapi.classify({
//     url: 'https://www.nature.com/articles/d41586-020-00973-x'
// }, function(error, response) {
//     if (error === null) {
//         response['categories'].forEach(function(c) {
//             console.log(c);
//         });
//         console.log(response);
//     }
// });

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log("Example app listening on port 8081!");
});