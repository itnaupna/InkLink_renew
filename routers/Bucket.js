const express = require('express');

const router = express.Router();
router.use(express.json());

const { bucketController } = require('../controllers/Bucket');

router.post('/api/b/upload', bucketController.upload);


module.exports = router;