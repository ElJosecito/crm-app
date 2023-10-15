//import express
const express = require('express');
const app = express();
//import config
const config = require('./config');

//import mongoose
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.dbConfig.host}:${config.dbConfig.port}/${config.dbConfig.name}`);
const db = mongoose.connection;

//db connection error handling
db.once('open', () => {
    console.log('Database succesfully connected!');
});
db.on('error', (err) => {
    console.log('Database connection error: ', err);
});

//midelewares
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//body parser
app.use(express.json());
//import routes
const voterRoute = require('./src/routes/voterRoute');
const coordinatorRoute = require('./src/routes/coordinatorRoute');
const colegioRoute = require('./src/routes/colegioRoute');
//use routes
app.use('/api/voters', voterRoute);
app.use('/api/coordinators', coordinatorRoute);
app.use('/api/schools', colegioRoute);


//start server
const port = config.appConfig.port;

app.listen(port, () => {
    console.log(`Server started on port ${config.appConfig.port}`);
});


