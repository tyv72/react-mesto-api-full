const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const registerValidator = celebrate({
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
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимум 8 символов',
      'string.max': 'Максимум 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимум 8 символов',
      'string.max': 'Максимум 30 символов',
    }),
    avatar: Joi.custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }),
  },
});

module.exports = registerValidator;
