const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware, profileController.getProfile);
router.get('/',authMiddleware,profileController.updateProfile);
router.put('/password',authMiddleware,profileController.changePassword);

module.exports = router;