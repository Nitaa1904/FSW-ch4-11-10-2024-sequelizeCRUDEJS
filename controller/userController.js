const { User } = require("../models");

//19. import modul imagekit di userController
const imagekit = require("../lib/imagekit");

// Function for get all user data
async function getAllUser(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      message: "Successfully obtained users data",
      isSuccess: true,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to get users data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

// Function for get user data by id
async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find spesific id user",
        isSuccess: false,
        data: null,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully obtained user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to get user data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

// Function for delete user by id
async function deleteUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find spesific id user",
        isSuccess: false,
        data: null,
      });
    }

    await user.destroy();

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete user data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

// Function for update user by id
async function UpdateUserById(req, res) {
  const { firstName, lastName, age, phoneNumber } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find spesific id user",
        isSuccess: false,
        data: null,
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Successfully update user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to update user data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

async function createUser(req, res) {
  // 12. panggil hasil proses multer
  const file = req.file;
  console.log(file);

  // 20. membuat processing file nya
  const split = file.originalname.split("."); // split utk memisahkan extension dan ambil file name
  const ext = split[split.length - 1]; // mengambil extension di indek terakhir makanya -1
  const filename = split[0];

  // 21. upload image ke server
  const uploadedImage = await imagekit.upload({
    file: file.buffer,
    fileName: `Profile-${filename}-${Date.now()}.${ext}`,
  });

  console.log(uploadedImage);
  // 22. buat validasi
  if (!uploadedImage) {
    return res.status(400).json({
      status: "Failed",
      message: "Failed to add user data because file not define",
      isSuccess: false,
      data: null,
    });
  }

  const newUser = req.body;

  try {
    // 13. panggil data user baru dan potoProfile agar muncul (tidak null) saat di hit di postman
    // ...newUser, photoProfile: req.file.path || multer
    await User.create({ ...newUser, photoProfile: uploadedImage.url });

    res.status(200).json({
      status: "Success",
      message: "Successfully added user data",
      isSuccess: true,
      // 13. panggil data user baru dan potoProfile agar muncul (tidak null) saat di hit di postman
      data: { ...newUser, photoProfile: uploadedImage.url },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to add user data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

module.exports = {
  getAllUser,
  getUserById,
  deleteUserById,
  UpdateUserById,
  createUser,
};
