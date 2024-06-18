const express = require('express');
const router = express.Router();
const managerController = require("../controllers/ManagerController");
const authMiddleware = require(".././middleware/middleware")

router.get('/profile', authMiddleware, managerController.getManagerProfile);
router.put('/basic-info-update', authMiddleware, managerController.managerBasicInfoUpdate);
router.post('/add-player', authMiddleware, managerController.addPlayer);
router.get('/get-players', authMiddleware, managerController.getMyPlayers);
router.get('/get-teams', authMiddleware, managerController.getManagerTeams);
router.put('/update-player/:playerId', authMiddleware, managerController.managerPlayerUpdate);

module.exports = router;