#!/usr/bin/env node
require('dotenv').config();
//SERVER INIT
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const app = express();
const port = process.env.APP_PORT || 3000;
const hostname = require('ip').address();
const app_ver = process.env.APP_VERSION;

require('./db/mongoose');
const userRouter = require('./routers/user');
const smartMeterRouter = require('./routers/smartMeter');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(smartMeterRouter);
app.use(userRouter);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//MONGODB INIT
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Vlad-Ber:arneiskogen1@cluster0.ab29i.mongodb.net/RoligEffekt?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//MONGODB FUNKTIONER
client.connect(err => {
    const db = client.db("RoligEffekt");
    const userReadings = db.collection("UserReadings");
    
    //FUNKTIONER-----------------------------------------------------
    async function insertData(jsonData){
	console.log("Insert Data");
	let data = await userReadings.insertOne(jsonData).catch((error) => console.error(error));
    };

    //DATA READING FROM HAN_MODULE EVERY 10 SECONDS
    app.use(bodyParser.raw({type: 'application/json'}))
	.post('/', async (req, res) => {
            console.log('body: ',req.body);
	    await insertData(req.body);
            res.send("ok")
	}).listen(3000, () => console.info('listening on port 3000..'));
});
client.close();



