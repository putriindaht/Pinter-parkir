const express = require("express");
const router = express.Router();
const ParkingRecordController = require("../controllers/parkingRecordController");

router.post("/", ParkingRecordController.addRecord);
router.patch("/", ParkingRecordController.patchRecord);
router.get("/", ParkingRecordController.getRecords);

module.exports = router;
