const express = require("express");
const router = express.Router();
const ParkingRecordController = require("../controllers/parkingRecordController");

router.patch("/in", ParkingRecordController.tapIn);
router.patch("/out", ParkingRecordController.tapOut);

module.exports = router;
