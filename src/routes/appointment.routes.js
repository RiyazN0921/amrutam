const express = require('express')

const appointmentController = require('../controller/appointment.controller')

const appointmentRouter = express.Router()

appointmentRouter.post(
  '/detect-missed',
  appointmentController.detectMissedAppointments,
)

appointmentRouter.post('/find-slots', appointmentController.findSlots)

appointmentRouter.post(
  '/reschedule',
  appointmentController.rescheduleAppointment,
)

appointmentRouter.post('/book', appointmentController.bookAppointment)

module.exports = appointmentRouter
