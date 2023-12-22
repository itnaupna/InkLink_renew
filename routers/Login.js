const express = require('express');

const router = express.Router();
router.use(express.json());

const { loginController } = require('../controllers/Login');
const {jwt} = require('../api/jwt');

router.post('/api/login',loginController.doFreshLogin);
router.post('/api/reconnect',loginController.doReconnect);
router.post('/api/loginguest',loginController.doGuestLogin);

 
module.exports = router;