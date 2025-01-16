const express = require("express");

// 9. implementasi multer
// const multer = require("multer");

const router = express.Router();

// 10. deklarasikan multernya
// const upload = multer({ dest: "public/images/users" });

// 18. Panggil upload lewat middleware
const upload = require("../middleware/uploader");

const userController = require("../controller/userController");

// API for get all users data
router.get("/", userController.getAllUser);

// API for get user data by id
router.get("/:id", userController.getUserById);

// API for delete user data by id
router.delete("/:id", userController.deleteUserById);

// API for update data by id
router.patch("/:id", userController.UpdateUserById);

// API for create new user data
// 11. panggil/selipin middleware multer || single foto
router.post("/", upload.single("photo"), userController.createUser);

module.exports = router;
