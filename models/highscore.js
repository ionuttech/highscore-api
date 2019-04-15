const mongoose = require('mongoose')
const Schema = mongoose.Schema

const highscoreSchema = new Schema({
	username: {
		type: String,
		required: 'A username is required',
	},
	score: {
		type: Number,
		score: 'A score is required',
	},
})

module.exports = mongoose.model('Highscore', highscoreSchema)
