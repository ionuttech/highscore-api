const mongoose = require('mongoose')

const Highscore = mongoose.model('Highscore')

module.exports.getScores = (req, res, next) => {
	Highscore.find().then(scores => {
		if (scores) {
			let sortedScores = scores.sort(compare);
			res.json(sortedScores.slice(0,15))
		}
	})
}

module.exports.saveScore = (req, res, next) => {
	console.log(req.body)
	if (req.body.username.length > 6) {
		res.status(400, 'Username is too long')
	}
	if (!req.body.score > 1000) {
		res.status(400, 'Score is too high')
	}
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

function compare(a,b) {
  if (a.score < b.score)
    return 1;
  if (a.score > b.score)
    return -1;
  return 0;
}


