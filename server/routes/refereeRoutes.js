const express = require('express');
const router = express.Router();
const refereeController = require("../controllers/refereeController");
const authMiddleware = require(".././middleware/middleware")

router.get('/profile/:id', authMiddleware, refereeController.getRefereeProfile);
router.get('/all-referees', authMiddleware, refereeController.getAllReferees);
router.put('/basic-info-update', authMiddleware, refereeController.refereeBasicInfoUpdate);
router.put('/fee-update', authMiddleware, refereeController.refereeFeeUpdate);


module.exports = router;