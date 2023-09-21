const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/Car.model");
const Reservation = require("../models/Reservation.model");

//  POST /api/cars  -  Creates a new car
router.post("/cars", (req, res, next) => {
   
  const { name, imageUrl, maxSpeedInKm, pricePerDay, description } = req.body;

  Car.create({ name, imageUrl, maxSpeedInKm, pricePerDay, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
})

//  GET /api/cars -  Retrieves all of the cars
router.get("/cars", (req, res, next) => {
  Car.find()
    .populate("reservations")
    .then((allCars) => res.json(allCars))
    .catch((err) => res.json(err));
});

//  GET /api/cars/:carId -  Retrieves a specific car by id
router.get("/cars/:carId", (req, res, next) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Car document has `reservations` array holding `_id`s of Reservation documents
  // We use .populate() method to get swap the `_id`s for the actual Reservation documents
  Car.findById(carId)
    .populate("reservations")
    .then((car) => res.status(200).json(car))
    .catch((error) => res.json(error));
});

// PUT  /api/cars/:carId  -  Updates a specific car by id
router.put("/cars/:carId", (req, res, next) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Car.findByIdAndUpdate(carId, req.body, { new: true })
    .then((updatedCar) => res.json(updatedCar))
    .catch((error) => res.json(error));
});

// DELETE  /api/cars/:carId  -  Deletes a specific car by id
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