const Patient = require('../model/patient.model')

const { sendResponse } = require('../utils/helper.utils')

const { CustomError } = require('../middleware/error.middleware')

exports.createPatient = async (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body

    if (!name || !email || !phoneNumber) {
      throw new CustomError('Name, email, and phone number are required', 400)
    }

    const patient = await Patient.create({ name, email, phoneNumber })

    return sendResponse(res, 200, 'patient created successfully', patient)
  } catch (error) {
    next(error)
  }
}

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()

    return sendResponse(res, 200, 'patient fetched successfully', patients)
  } catch (error) {
    next(error)
  }
}
