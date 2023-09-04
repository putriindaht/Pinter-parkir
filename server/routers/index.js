const rateLimit = require("express-rate-limit");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const routerVehicle = require("./vehicle");
const routerSubscription = require("./subsscription");
const routerTransaction = require("./transactions");
const routerLocation = require("./location");
const routerParkingRecords = require("./parkingRecord");
const routerAdminParkingRecords = require("./adminParkingRecord");
const adminAuthorization = require("../middlewares/adminAuthorization");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many request, please try again later.",
});

router.get("/", (req, res) => {
  res.send("Hello there!");
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/glogin", userController.glogin);

router.use(authentication);
router.use(limiter);
router.use("/vehicles", routerVehicle);
router.use("/subscriptions", routerSubscription);
router.use("/transactions", routerTransaction);
router.use("/locations", routerLocation);
router.use("/parkingrecords", routerParkingRecords);

router.use(
  "/admin/parkingrecords",
  adminAuthorization,
  routerAdminParkingRecords,
);

module.exports = router;
