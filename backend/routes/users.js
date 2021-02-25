const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  sendUsers, sendUserById, sendUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', sendUsers);
router.get('/users/me', sendUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .messages({
        'string.length': 'Длина идентификатора пользователя должна быть равна 24',
        'string.hex': 'Идентификатор пользователя должен быть в 16ричном формате',
        'any.required': 'Идентификатор пользователя - обязательное поле',
      }),
  }),
}), sendUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Длина имени должна быть не менее 2 символов',
      'string.max': 'Длина имени должна быть не более 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Длина описания должна быть не менее 2 символов',
      'string.max': 'Длина описания должна быть не более 30 символов',
    }),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка на аватар');
    }),
  }),
}), updateAvatar);

module.exports = router;
