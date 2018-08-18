const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Location = mongoose.model('Location', LocationSchema)
module.exports.Location = Location