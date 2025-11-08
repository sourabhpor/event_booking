import Joi from "joi";

const createEventValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  city: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.date().required(),
  totalSeats: Joi.number().required(),
  price: Joi.number().required(),
});

const updateEventValidation = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  city: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.date(),
  totalSeats: Joi.number(),
  price: Joi.number(),
});

export default {
  createEventValidation,
  updateEventValidation,
};
