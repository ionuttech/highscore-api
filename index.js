const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 7000

require('dotenv').config({ path: 'variables.env' })

mongoose.connect(process.env.DATABASE)
mongoose.connection.on('error', error => {
	console.log(error.message)
})

require('./models/highscore')

const routes = require('./routes')

app.use(cors())

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'pug')

app.use('/', routes)

app.get('/', (req, res, next) => {
	res.send('Hello world')
})

const server = app.listen(PORT, () => {
	console.log('Express server running on port', PORT)
})
