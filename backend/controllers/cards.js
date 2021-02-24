const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnathorizedError');
const Card = require('../models/card');

module.exports.sendCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
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
      if (card.owner._id.equals(req.user._id)) {
        console.log(`card.owner = ${card.owner} \n`);
        console.log(`req.user._id = ${req.user._id} \n`);
        throw new UnauthorizedError(`Карточка с идентификатором ${req.params.cardId} добавлена другим пользователем`);
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
