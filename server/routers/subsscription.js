const express = require("express");
const router = express.Router();
const subsController = require("../controllers/subsController");
const adminAuthorization = require("../middlewares/adminAuthorization");

router.get("/", subsController.getListSubs);
router.use(adminAuthorization);
router.post("/", subsController.addSubs);
router.delete("/:id", subsController.deleteSubs);

module.exports = router;
