const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

//untuk generate token midtrans
router.post("/", transactionController.addTransaction);

//setelah transaksi selesai dan sukses maka akan mengubah status transaksi menjadi success
router.patch("/finish/:orderId", transactionController.finishTransaction);
router.get("/", transactionController.getTransaction);
module.exports = router;
