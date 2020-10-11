const express = require('express');
const { check } = require('express-validator');
const path = require("path") ;

const destiny = path.join(__dirname, '../uploads/');

const usersController = require('../controllers/controller');

const MIME_MATCH = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpeg'
};

const multer = require('multer');
var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 
      const isValid = MIME_MATCH[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, destiny);
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + "-" + Date.now()+path.extname(file.originalname)) 
  } 
}) 

const router = express.Router();

const files = multer({ storage: storage });

router.post(
  '/upload',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description')
      .not()
      .isEmpty()
  ],files.single('image'),
  usersController.fileupload
);

router.get('/fetch',usersController.fetch);

module.exports = router;