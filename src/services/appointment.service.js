const {
  sendRescheduleOptions,
} = require('../controller/notification.controller')

const Appointment = require('../model/appointment.model')

const Doctor = require('../model/doctor.model')

const Patient = require('../model/patient.model')

const moment = require('moment')

const detectMissedAppointments = async () => {
  const currentTime = moment()
  const gracePeriod = moment().subtract(15, 'minutes')

  const missedAppointments = await Appointment.find({
    status: 'booked',
    date: { $lt: gracePeriod },
  }).populate('patientId doctorId')

  for (const appointment of missedAppointments) {
    appointment.status = 'missed'
    await appointment.save()

    const doctor = await Doctor.findById(appointment.doctorId)
    const availableSlots = doctor.availableSlots.filter((slot) =>
      moment(slot).isAfter(currentTime),
    )

    if (availableSlots.length > 0) {
      await sendRescheduleOptions(appointment.patientId, availableSlots)
    }
  }
}

const findAvailableSlots = async (doctorId, requestedTime) => {
  const doctor = await Doctor.findById(doctorId)

  if (!doctor) throw new Error('Doctor not found')

  const availableSlots = doctor.availableSlots.filter((slot) => {
    return moment(slot).isAfter(requestedTime)
  })

  return availableSlots
}

const rescheduleAppointment = async (appointmentId, newDate) => {
  const appointment = await Appointment.findById(appointmentId)
  if (!appointment) throw new Error('Appointment not found')

  appointment.date = newDate
  appointment.status = 'rescheduled'
  await appointment.save()
}

module.exports = {
  detectMissedAppointments,
  findAvailableSlots,
  rescheduleAppointment,
}
