const { lobbyController } = require('../controllers/Lobby');

const router = require('express').Router();

router.get('/api/lobby/notice', lobbyController.notice);

module.exports = router;
