import Joi from "joi";

const validation = post => {
  const schema = Joi.object({
    post: Joi.string().empty().required()
      .messages({
        "any.required": "Post is required.",
        "string.empty": "Sorry, post cannot be an empty field."
      }),
    description: Joi.string().empty().required()
      .messages({
        "any.required": "description is required.",
        "string.empty": "Sorry, description cannot be an empty field."
      }),
    media: Joi.string().empty()
      .messages({
        "any.required": "A media is required.",
        "string.empty": "media field cannot be an empty field.",
        "string.base": "Please provide a valid link."

      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(post);
};
const validateId = ids => {
  const schema = Joi.object({
    id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(ids);
};

export { validation, validateId };
