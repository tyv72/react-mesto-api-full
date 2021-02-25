const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  sendCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', sendCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.required().custom((value, helper) => {
      if (/^(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+(?:[a-z]+)(?:\/[a-z0-9-._~:?#/[\]@!$&'()*+,;=]*)?#?$/gmi.test(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка на карточку');
    }).messages({
      'any.required': 'Ссылка на карточку - обязательное поле',
    }),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.required().string().length(24).hex()
      .messages({
        'string.length': 'Длина идентификатора карточки должна быть равна 24',
        'string.hex': 'Идентификатор карточки должен быть в 16ричном формате',
        'any.required': 'Идентификатор карточки - обязательное поле',
      }),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.required().string().length(24).hex()
      .messages({
        'string.length': 'Длина идентификатора карточки должна быть равна 24',
        'string.hex': 'Идентификатор карточки должен быть в 16ричном формате',
        'any.required': 'Идентификатор карточки - обязательное поле',
      }),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.required().string().length(24).hex()
      .messages({
        'string.length': 'Длина идентификатора карточки должна быть равна 24',
        'string.hex': 'Идентификатор карточки должен быть в 16ричном формате',
        'any.required': 'Идентификатор карточки - обязательное поле',
      }),
  }),
}), dislikeCard);

module.exports = router;
