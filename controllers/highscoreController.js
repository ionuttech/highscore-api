const mongoose = require('mongoose')

const Highscore = mongoose.model('Highscore')

module.exports.getScores = (req, res, next) => {
	Highscore.find().then(scores => {
		if (scores) {
			res.json(scores)
		}
	})
}

module.exports.saveScore = (req, res, next) => {
	console.log(req.body)
	if (!req.body.username) {
		res.status(400, 'Username was not defined')
	}
	if (!req.body.score) {
		res.status(400, 'Score was not defined')
	}
	const newScore = new Highscore({
		username: req.body.username,
		score: req.body.score,
	})
	newScore.save().then(score => {
		if (score) {
			res.json(score)
		}
	})
}
