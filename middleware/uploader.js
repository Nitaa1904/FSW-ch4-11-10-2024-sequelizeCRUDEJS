const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();

const multerFiltering = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        throw new Error("image format is not valid")
    }
};

const upload = multer({ 
    fileFilter: multerFiltering,
    // dest: 'public/images/users'
})

module.exports = upload;
