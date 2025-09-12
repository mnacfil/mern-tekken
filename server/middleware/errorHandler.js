class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.message = message;
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log("Handling error");

  res.status(err.statusCode).json({
    error: err,
    message: err.message,
  });
};

export { globalErrorHandler, APIError };
