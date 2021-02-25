const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const loginValidator = celebrate({
  body: {
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'any.required': 'Обязательное поле',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

module.exports = loginValidator;
