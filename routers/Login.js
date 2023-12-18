const express = require('express');

const router = express.Router();
router.use(express.json());

const { loginController } = require('../controllers/Login');

router.post('/api/login',loginController.doFreshLogin);
router.post('/api/reconnect',loginController.doReconnect);



module.exports = router;