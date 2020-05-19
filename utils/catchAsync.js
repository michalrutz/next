import errorHandler from "./errorHandler";

exports.catchAsync = (fn) => {
  return (...args) => {
    try {
      fn(...args);
    } catch (err) {
      errorHandler(err);
    }
  };
};
