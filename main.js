
/*var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!');
    res.end();
}).listen(8080);*/

var dbAPI = require('./DBAPI/db.js');
var express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const fs = require('fs');
var path = require("path");
require('dotenv').config();




var app = express();



async function main() {
    

    const Mongouri = dbAPI.url;

    
   
    try {
        
       


        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Origin", process.env.CORS_FRONTEND_URL);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
            });

        app.use(express.json())

        // setup user endpoint/route
        const userRouter = require('./routes/users')
        app.use('/users', userRouter)

        app.listen(process.env.PORT);
        console.log("listening on "+ process.env.PORT);


    } catch (e) {
        console.error(e);
    } 
 
}

main().catch(console.error);