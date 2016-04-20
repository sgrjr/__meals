var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

     // url encoding
     app.use(bodyParser.urlencoded({extended:false}));
     // gzip
     // redirect all html requests to `index.html`
     app.use(function (req, res, next) {
         if (path.extname(req.path).length > 0) {
                 // normal static file request
                 next();
             }
         else {
                 // should force return `index.html` for angular.js
                 req.url = '/index.html';
                 next();
             }
     });
     // static file serve
     app.use(express.static(__dirname))
app.listen(3000)