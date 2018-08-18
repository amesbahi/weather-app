const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const Location = require('./models/Location').Location
const cors = require('cors')
const app = express()

app.options('*', cors())

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors())

// parse requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// handle db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')

const db = mongoose.connection

db.on('error', function (err) {
  console.error(`connection error: ${err}`)
})

db.once('open', function (err) {
  if (err) {
    console.error(`error: ${err}`)
  } else {
    console.log(`db connection succesful`)
  }
})

// http request logging
app.use(morgan('dev'))

// catch 404 and forward to global error handler
app.use(function (req, res, next, err) {
  console.log(err)
  err.status = 404
  next(err)
})

// Express's global error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})

app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

const PORT = process.env.PORT || 5000

// Post location to db
app.post('/api/locations', cors(corsOptions), (req, res, next) => {
  const location = new Location(req.body)
  location.save((err, location) => {
    if (err) {
      res.status(400)
      return res.send(err)
    }
    return res.send(location)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
