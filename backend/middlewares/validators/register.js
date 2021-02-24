const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const register = celebrate({
  body: {
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    email: Joi.string().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

module.exports = register;
