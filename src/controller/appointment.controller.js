const { CustomError } = require('../middleware/error.middleware')
const appointmentModel = require('../model/appointment.model')
const doctorModel = require('../model/doctor.model')
const patientModel = require('../model/patient.model')
const appointmentService = require('../services/appointment.service')

const notificationService = require('../services/notification.service')

const { sendResponse } = require('../utils/helper.utils')

exports.detectMissedAppointments = async (req, res, next) => {
  try {
    const a = await appointmentService.detectMissedAppointments()

    return sendResponse(res, 200, 'Missed appointments detected', a)
  } catch (error) {
    next(error)
  }
}

exports.findSlots = async (req, res, next) => {
  try {
    const { doctorId, requestedTime } = req.body
    const availableSlots = await appointmentService.findAvailableSlots(
      doctorId,
      requestedTime,
    )

    return sendResponse(res, 200, 'slots fetched', availableSlots)
  } catch (error) {
    next(error)
  }
}

exports.rescheduleAppointment = async (req, res, next) => {
  try {
    const { appointmentId, newDate } = req.body
    await appointmentService.rescheduleAppointment(appointmentId, newDate)

    return sendResponse(res, 200, 'Appointment rescheduled successfully')
  } catch (error) {
    next(error)
  }
}

exports.bookAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, date, reason } = req.body

    if (!patientId || !doctorId || !date) {
      throw new CustomError('Patient ID, Doctor ID, and date are required', 400)
    }

    const patient = await patientModel.findById(patientId)
    if (!patient) {
      throw new CustomError('Patient not found', 404)
    }

    const doctor = await doctorModel.findById(doctorId)
    if (!doctor) {
      throw new CustomError('Doctor not found', 404)
    }

    const isSlotAvailable = doctor.availableSlots.some(
      (slot) => new Date(slot).toISOString() === new Date(date).toISOString(),
    )
    if (!isSlotAvailable) {
      throw new CustomError('Doctor is not available at the selected time', 400)
    }

    const appointment = new appointmentModel({
      patientId,
      doctorId,
      date,
      reason,
    })

    await appointment.save()

    return sendResponse(
      res,
      200,
      'Appointment booked successfully',
      appointment,
    )
  } catch (error) {
    next(error)
  }
}
