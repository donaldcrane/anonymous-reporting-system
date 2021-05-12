import Joi from "joi";

const loginValidation = user => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co", "io"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Sorry, email is required",
        "string.email": "Please enter a valid email",
        "string.empty": "Sorry, Email cannot be an empty field",
      }),
    password: Joi.string().required().min(5).max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "string.pattern.base": "Password must contain only alphanumeric characters.",
        "string.empty": "Sorry, password cannot be an empty field",
        "string.min": "Password should have a minimum length of 5"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  });
  return schema.validate(user);
};

export default loginValidation;
