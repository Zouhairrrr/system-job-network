const joi = require("joi");

const createValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required().min(6),
    email: joi.string().required().email(),
    role: joi.string().required().valid("owner", "client"),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required().min(6),
    email: joi.string().required().email(),
    role: joi.string().required().valid("owner", "client"),
    password: joi.string().required()
  });
  return schema.validate(data);
};
module.exports = { createValidation, updateValidation };
