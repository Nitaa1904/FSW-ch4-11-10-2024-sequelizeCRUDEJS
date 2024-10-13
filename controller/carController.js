const { Car } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllCars(req, res) {
    try {
        // console.log("proses saat ada yang request")
        // console.log(req.reqestTime)
        // console.log("siapa yang request")
        // console.log(req.username)
        // console.log("proses API yang diminta")
        // console.log(req.originalUrl)


        const cars = await Car.findAll();

        res.status(200).json({
            status: "200",
            message: "Success get cars data",
            isSuccess: true,
            data: { cars },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function getCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }

        res.status(200).json({
            status: "200",
            message: "Success get cars data",
            isSuccess: true,
            data: { car },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function deleteCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (car) {
            await car.destroy();

            res.status(200).json({
                status: "200",
                message: "Car successfully deleted",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function updateCar(req, res) {
    const id = req.params.id;
    const { plate, model, type, year } = req.body;

    try {
        const car = await Car.findByPk(id);

        if (car) {
            car.plate = plate;
            car.model = model;
            car.type = type;
            car.year = year;

            await car.save();

            res.status(200).json({
                status: "200",
                message: "Success get cars data",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to update car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function createCar(req, res, next) {
    const { plate, model, type, year } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            status: "400",
            message: "No files provided",
            isSuccess: false,
            data: null,
        });
    }

    try {
        const uploadedCarsPhotos = [];

        for (let i = 0; i < req.files.length; i++) {
            const split = req.files[i].originalname.split(".");
            const ext = split[split.length - 1];
            const filename = `Car-${Date.now()}-${i}.${ext}`;
            
            try {
                const uploadedImages = await imagekit.upload({
                    file: req.files[i].buffer,
                    fileName: filename,
                });
                uploadedCarsPhotos.push(uploadedImages.url);
            } catch (uploadError) {
                return res.status(500).json({
                    status: "500",
                    message: `Failed to upload image ${i + 1}: ${uploadError.message}`,
                    isSuccess: false,
                    data: null,
                });
            }
        }

        const newCar = await Car.create({
            plate,
            model,
            type,
            year,
            images: uploadedCarsPhotos,
        });

        res.status(201).json({
            status: "201",
            message: "Car successfully added",
            isSuccess: true,
            data: newCar,
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createCar,
    getAllCars,
    getCarById,
    deleteCarById,
    updateCar,
};
