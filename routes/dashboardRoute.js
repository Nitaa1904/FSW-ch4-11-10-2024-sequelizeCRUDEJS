const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const upload = require("../middleware/uploader");

// e. buat get user
router.get("/users", dashboardController.userPage);

// g. buat create user
router.get("/users/create", dashboardController.createPage);

// j. tambah route post
router.post(
  "/users/create",
  upload.single("photo"),
  dashboardController.createUser
);
// view engine = gak ada put/patch dan delete

module.exports = router;
