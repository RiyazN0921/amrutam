const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['booked', 'missed', 'rescheduled'],
    default: 'booked',
  },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const appointmentModel = mongoose.model('Appointment', appointmentSchema)

module.exports = appointmentModel
