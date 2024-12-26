const express = require('express')

const patientController = require('../controller/patient.controller')

const patientRouter = express.Router()

patientRouter.post('/', patientController.createPatient)

patientRouter.get('/', patientController.getPatients)

module.exports = patientRouter
