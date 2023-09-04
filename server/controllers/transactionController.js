const { Transaction, Subscription, Vehicle } = require("../models");
const midtransClient = require("midtrans-client");
const MIDTRANS_SERVER_KEY = "SB-Mid-server-9ghhHUzCYv3wfa36nvG0xKSh";
const { v4: uuidv4 } = require("uuid");
const getSubscriptionExpDate = require("../helpers/getSubscriptionExpDate");

class transactionController {
  // ketika klik beli/subscribe untuk generate token midtrans
  static async addTransaction(req, res, next) {
    try {
      const { subsId } = req.body;
      const { id: userId, email } = req.user;
      const today = new Date();
      const selectedSub = await Subscription.findByPk(subsId);
      if (!selectedSub) {
        throw { name: "Subscription not found" };
      }

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: `${selectedSub.id}-${userId}-${uuidv4()}`,
          gross_amount: selectedSub.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          id: userId,
          email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);

      await Transaction.create({
        startDate: today,
        expiredDate: getSubscriptionExpDate(
          today,
          selectedSub.durationAmount,
          selectedSub.durationUnit,
        ),
        orderId: parameter.transaction_details.order_id,
        SubscriptionId: selectedSub.id,
        UserId: userId,
      });

      res.status(201).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }

  static async finishTransaction(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { orderId } = req.params;
      const transaction = await Transaction.findOne({
        where: {
          UserId: userId,
          orderId,
        },
      });

      if (!transaction) {
        throw { name: "Transaction not found" };
      }
      await Transaction.update(
        { status: "paid" },
        {
          where: {
            id: transaction.id,
          },
        },
      );
      res.status(200).json({
        message: "Your subscription successfully paid",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTransaction(req, res, next) {
    try {
      const { id, role } = req.user;

      console.log({ role });

      let userFilter = {};
      if (role === "customer") {
        userFilter = { UserId: id };
      }

      const option = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: userFilter,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Subscription,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      };
      const transactions = await Transaction.findAll(option);
      console.log(transactions);
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = transactionController;
