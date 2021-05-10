const joi = require("joi");

const developerRegisterValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  companyName: joi.string().required(),
  registrationId: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

const buyerRegisterValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

const loginValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

module.exports = {
  developerRegisterValidator,
  buyerRegisterValidator,
  loginValidator,
};
