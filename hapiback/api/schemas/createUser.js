const Joi = require('joi');
 console.log('test1');
const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = createUserSchema;