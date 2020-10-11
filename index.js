const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/HttpError');

const path = require('path');
const upload = require('./routes/upload');

const app = express();
const port = process.env.PORT || 5000;

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
  });
  
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/files',express.static(path.join(__dirname, 'uploads')));     

app.use('/',upload);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error);
  });
  
app.listen(port);