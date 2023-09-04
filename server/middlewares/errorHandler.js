const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Invalid email/password":
      status = 401;
      message = err.name;
      break;
    case "Invalid token":
      status = 401;
      message = err.name;
      break;
    case "Vehicle not found":
      status = 404;
      message = err.name;
      break;
    case "Subscription not found":
      status = 404;
      message = err.name;
      break;
    case "Transaction not found":
      status = 404;
      message = err.name;
      break;
    case "Transaction expired":
      status = 408;
      message = err.name;
      break;
    case "QR is expired":
      status = 408;
      message = err.name;
      break;
    case "Parking record not found":
      status = 404;
      message = err.name;
      break;
    case "Not authorized":
      status = 403;
      message = err.name;
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
  }
  res.status(status).json({
    statusCode: status,
    message: message,
  });
};

module.exports = errorHandler;
