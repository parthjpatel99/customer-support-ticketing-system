const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateTicket(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  // Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  // Message checks

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  if (!Validator.isLength(data.title, { min: 4, max: 40 })) {
    errors.title = "Ttile can be atmost 40 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
