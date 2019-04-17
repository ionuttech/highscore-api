const mongoose = require('mongoose')

const Highscore = mongoose.model('Highscore')

module.exports.getScores = (req, res, next) => {
	Highscore.find().then(scores => {
		if (scores) {
			let sortedScores = scores.sort(compare);
			res.json(sortedScores)
		}
	})
}

module.exports.saveScore = (req, res, next) => {
	console.log(req.body)
	if (req.body.username.length > 6) {
		res.status(400, 'Username is too long')
		return;
	}
	if (!req.body.score > 999) {
		res.status(400, 'Score is too high')
		return;
	}
	if (!req.body.username) {
		res.status(400, 'Username was not defined')
		return;
	}
	if (!req.body.score) {
		res.status(400, 'Score was not defined')
		return;
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


