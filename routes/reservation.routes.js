const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Reservation = require("../models/Reservation.model");
const Car = require("../models/Car.model");

//  POST /reservations/reservations -  Creates a new reservation
router.post("/reservations", (req, res, next) => {
    
  const { pickupTime, dropOffTime, address, phone, carId} = req.body;

  Reservation.create({ pickupTime, dropOffTime, address, phone, carId })
    .then((newReservation) => {
      return Car.findByIdAndUpdate(carId, {
        $push: { reservations: newReservation._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /reservations/reservations -  Retrieves all of the reservations
router.get("/reservations", (req, res, next) => {
    Reservation.find()
    //   .populate("reservations")
      .then((allReservations) => res.json(allReservations))
      .catch((err) => res.json(err));
  });

  //  GET /reservations/reservations-by-car/:carId -  Retrieves all reservations for one car
router.get("/reservations-by-car/:carId", (req, res, next) => {
  const { carId } = req.params;
  var query = { carId: carId };
  Reservation.find(query)
    // .populate("reservations")
    .then((allReservations) => res.json(allReservations))
    .catch((err) => res.json(err));
});

//  GET /reservations/reservations/:reservationId  - Retrieves a specific reservation by id
router.get("/reservations/:reservationId", (req, res, next) => {
  const { reservationId } = req.params;

  Reservation.findById(reservationId)
    .then((reservation) => res.json(reservation))
    .catch((error) => res.json(error));
});

// // PUT  /api/reservations/:reservationId  - Updates a specific reservation by id
// router.put("/reservations/:reservationId", (req, res, next) => {
//   const { reservationId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(reservationId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Reservation.findByIdAndUpdate(reservationId, req.body, { new: true })
//     .then((updatedReservation) => res.json(updatedReservation))
//     .catch((err) => res.json(err));
// });

// //  DELETE /api/reservations/:reservationId  - Deletes a specific reservation by id
// router.delete("/reservations/:reservationId", (req, res, next) => {
//   const { reservationId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(reservationId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   Reservation.findByIdAndRemove(reservationId)
//     .then(() =>
//       res.json({ message: `Reservation with ${reservationId} is removed successfully.` })
//     )
//     .catch((error) => res.json(error));
// });

module.exports = router;