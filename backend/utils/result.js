const success = (res, data, message = "Success", code = 200) => {
  if (res.headersSent) return;

  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

const error = (res, message = "Something went wrong", code = 400) => {
  if (res.headersSent) return;

  return res.status(code).json({
    status: "error",
    message,
  });
};

module.exports = {
  success,
  error,
};