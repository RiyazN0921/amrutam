const express = require('express')

const doctorController = require('../controller/doctor.controller')

const doctorRouter = express.Router()

doctorRouter.post('/', doctorController.createDoctor)

doctorRouter.get('/', doctorController.getDoctors)

module.exports = doctorRouter
