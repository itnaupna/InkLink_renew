const express = require('express');
const router = express.Router();
router.use(express.json());

const { registerController } = require('../controllers/Register');


router.post('/api/join', registerController.signUp);

router.post('/api/join/id', registerController.chkId);

router.post('/api/join/nick', registerController.chkNick);

router.post('/api/join/email', registerController.chkEmail);

module.exports = router;