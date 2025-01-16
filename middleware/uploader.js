const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();

// 15. Filtering
const multerFiltering = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    throw new Error("image format is not valid");
  }
};

const upload = multer({
  // 16. nambah opsion baru untuk filtering
  fileFilter: multerFiltering,
  // dest: 'public/images/users' || 14. upload file yang dari userRoute
});

// 17. buat module.export
module.exports = upload;
