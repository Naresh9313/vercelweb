import Joi from 'joi';

export const RegisterValidation = Joi.object({
  name: Joi.string().required().min(5).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5).max(20),
  role: Joi.string().required()

});

// export const EventValidation = Joi.object({
//   ename: Joi.string().required().min(5).max(20),
//   edate: Joi.string().required(),
//   evenues: Joi.string().required(),
//   eprice: Joi.string().required(),
//   elocation: Joi.string().required(),
//   category: Joi.string().required().min(5).max(20),
// });
