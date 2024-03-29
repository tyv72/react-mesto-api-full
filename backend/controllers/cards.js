const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

module.exports.sendCards = (req, res, next) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (card == null) {
        throw new NotFoundError(`Карточка с идентификатором ${req.params.cardId} не найдена`);
      }
      if (!card.owner._id.equals(req.user._id)) {
        throw new ForbiddenError(`Карточка с идентификатором ${req.params.cardId} добавлена другим пользователем`);
      }
    }).then(() => {
      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card == null) {
        throw new NotFoundError(`Карточка с идентификатором ${req.params.cardId} не найдена`);
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card == null) {
        throw new NotFoundError(`Карточка с идентификатором ${req.params.cardId} не найдена`);
      }
      res.send({ data: card });
    })
    .catch(next);
};
