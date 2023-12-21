const express = require('express');

const router = express.Router();
router.use(express.json());

const { bucketController } = require('../controllers/Bucket');
const {jwt} = require('../api/jwt');
router.post('/api/b/upload',jwt.getUserData, bucketController.multer2.single('img'), bucketController.upload);
// router.post('/api/b/upload', bucketController.multer.single('img'), bucketController.upload);
// router.put('/api')

module.exports = router;