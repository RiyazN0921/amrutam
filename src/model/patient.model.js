const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
})

const patientModel = mongoose.model('Patient', patientSchema)

module.exports = patientModel
