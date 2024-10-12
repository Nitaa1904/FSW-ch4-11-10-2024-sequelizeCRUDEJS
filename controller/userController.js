const { User } = require("../models");
const imagekit = require("../lib/imagekit")

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
    // hasil proses multer
    console.log(req.file)
    const split = req.file.originalname.split(".");

    const ext = split[split.lenght -1]

    //upload image ke server
    const uploadImage = await imagekit.upload({
        file: req.file.buffer,  // Use req.file to access the uploaded file
        fileName: `Profile-${Date.now()}.${ext}` // Assuming ext is defined as the file extension
    });
    
    console.log(uploadImage)
    if (!uploadImage) {  
        return res.status(400).json({
            status: "Failed",
            message: "Image upload failed", 
            isSuccess: false,
            data: null,
        });
    }
    

    const newUser = req.body;

    try {
        await User.create({...newUser, photoProfile: uploadImage });

        res.status(200).json({
            status: "Success",
            message: "Successfully added user data",
            isSuccess: true,
            data: { ...newUser, photoProfile: req.file.path },
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