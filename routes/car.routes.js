const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/Car.model");
const Reservation = require("../models/Reservation.model");

// const fileUploader = require("../config/cloudinary.config");

//  POST /cars/cars  -  Creates a new car
router.post("/cars", (req, res, next) => {
   
  const { name, imageUrl, maxSpeedInKm, pricePerDay, description } = req.body;
  if (name === "" || maxSpeedInKm === "" || pricePerDay === "" || description === "" ) {
    res.status(400).json({ message: "Fill in all fields please" });
    return;
  }
  Car.create({ name, imageUrl, maxSpeedInKm, pricePerDay, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
})

//  GET /cars/cars -  Retrieves all of the cars
router.get("/cars", (req, res, next) => {
  Car.find()
    // .populate("reservations")
    .then((allCars) => res.json(allCars))
    .catch((err) => res.json(err));
});

// // POST "/cars/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
// router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
//   // console.log("file is: ", req.file)
 
//   if (!req.file) {
//     next(new Error("No file uploaded!"));
//     return;
//   }
//   // Get the URL of the uploaded file and send it as a response.
//   // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
//   res.json({ fileUrl: req.file.path });
// });

//  GET /cars/cars/:carId -  Retrieves a specific car by id
router.get("/cars/:carId", (req, res, next) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Car document has `reservations` array holding `_id`s of Reservation documents
  // We use .populate() method to get swap the `_id`s for the actual Reservation documents
  Car.findById(carId)
    // .populate("reservations")
    .then((car) => res.status(200).json(car))
    .catch((error) => res.json(error));
});

// PUT  /cars/cars/:carId  -  Updates a specific car by id
router.put("/cars/:carId", (req, res, next) => {
  const { carId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const { name, imageUrl, maxSpeedInKm, pricePerDay, description } = req.body;
  if (name === "" || maxSpeedInKm === "" || pricePerDay === "" || description === "" ) {
    res.status(400).json({ message: "Fill in all fields please" });
    return;
  }

  Car.findByIdAndUpdate(carId, req.body, { new: true })
    .then((updatedCar) => res.json(updatedCar))
    .catch((error) => res.json(error));
});

// DELETE  /cars/cars/:carId  -  Deletes a specific car by id
router.delete("/cars/:carId", (req, res, next) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

 Car.findByIdAndRemove(carId)
    .then(() =>
      res.json({
        message: `Car with ${carId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;