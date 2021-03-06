const { validationResult } = require('express-validator');

const HttpError = require('../models/HttpError');
const db = require('../utils/database');
const path = require('path');


//const process_error = new HttpError('Data could not be processed.', 500);
const invalid_error = new HttpError('Invalid inputs passed, please check your data.', 422);
const db_error = new HttpError('Database issue', 500);

const deletedata = async (req,res,next) => {
    const str = "DELETE from images where id = " + req.body.id;
    db.execute(str).then((response) => {res.status(201).json({ values: response })},res).catch((e) => {
        console.log(e);
});
}

const fetch = async (req,res,next) => {
    db.execute('SELECT * from images').then((response) => {
    res.status(201).json({ values: response });},res)
    .catch((e) => {
        return next(db_error);
});
}


const fileupload = async (req,res,next) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(invalid_error);
      }

      var { title,description } = req.body;
      var imageURL = req.protocol +  "://" + req.get("host") + "/files/" +req.file.filename;
      console.log(req.file.path);

      db.execute('INSERT INTO images (title, description, link) VALUES (?, ?, ?)',
      [title,description,imageURL]).then((response) => {res.status(201).json({ values: response })},res).catch((e) => {
          return next(db_error);
});
}



exports.fileupload = fileupload;
exports.fetch = fetch;
exports.deletedata = deletedata;