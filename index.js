
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

// set static folder
app.use(express.static(path.join(__dirname, 'public')));;
const request = require('request');

// testPay
app.post('/newregistration', async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
    }
    const { name, email, password } = req.body;
    if (name && email) {
        if (name === "" || email === "" || password === "") {
            res.status(400).send({
                message: "Incorrect entry format"
            });
        } else {
            try {
                queryParameters = req.body;

                var obj = {
                    "firstname": req.body.name,
                    "email": req.body.email
                }

                const paramsIntercom = JSON.stringify({
                    "email": "EMAIL ID",
                    "firstName": "Name"
                });


                const username = "MAUTIC USERNAME" //process.env.username;
                const password = "PASSWORD"  //process.env.password;
                const auth = new Buffer.from(username + ":" + password).toString("base64");

                var options = {

                    url: 'MAUTIC URL',
                    method: "POST",
                    form: obj,
                    headers: {
                        "Authorization": "BASIC " + auth,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
                request.post(options, function (error, response, body) {
                    if (error) {
                        console.log(error, "Error ********************")
                    }
                })

                res.status(201).send({ message: "its working" })

            } catch (error) {
                console.log("2nd phase")
                console.log(error)
                res.status(400).send({ message: "Error while sending to mautic" })
            }
        }
    } else {
        res.status(400).send({
            message: "Incorrect entry format"
        });
    }
})


// Connect to port
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}...`));  