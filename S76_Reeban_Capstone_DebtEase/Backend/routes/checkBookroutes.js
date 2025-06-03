const express = require('express');
const router = express.Router();
const checkBookcontroller = require('../controllers/checkBook');
const authMiddleWare = require('../middlewares/authMiddleware');

router.post('/',authMiddleWare, checkBookcontroller.addCheck);
router.get('/',authMiddleWare, checkBookcontroller.getCheck);
router.put('/:id/bounce', authMiddleWare, checkBookcontroller.bounceCheck);
router.put('/:id/clear', authMiddleWare, checkBookcontroller.clearCheck);

module.exports = router;