const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const register = celebrate({
  body: {
    // name: Joi.string().required().min(2).max(30)
    //   .messages({
    //     'string.min': 'Минимальная длина 2 символа',
    //     'string.max': 'Максимальная длина 30 символов',
    //     'any.required': 'Обязательное поле',
    //   }),
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
