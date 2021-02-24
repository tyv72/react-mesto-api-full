const router = require('express').Router();

const {
  sendUsers, sendUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', sendUsers);
router.get('/users/me', sendUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
