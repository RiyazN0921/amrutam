const express = require('express')

const patientRouter = require('./patient.routes')

const notificationRouter = require('./notification.routes')

const doctorRouter = require('./doctor.routes')

const appointmentRouter = require('./appointment.routes')

const router = express.Router()

router.get('/status', () => {
  res.json({ message: 'server is live' })
})

router.use('/patient', patientRouter)

router.use('/doctor', doctorRouter)

router.use('/notification', notificationRouter)

router.use('/appointment', appointmentRouter)

module.exports = router
