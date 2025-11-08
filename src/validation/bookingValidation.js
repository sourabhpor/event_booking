import Joi from "joi";

const bookingValidation = Joi.object({
  eventId: Joi.string().required(),
  qty: Joi.number().integer().min(1).required(),
});

export default { bookingValidation };
