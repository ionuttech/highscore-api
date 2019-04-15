const express = require('express')
const router = express.Router()

const highscoreController = require('../controllers/highscoreController')

router.get('/get-scores', highscoreController.getScores)
router.post('/save-score', highscoreController.saveScore)

module.exports = router
