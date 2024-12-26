const { CustomError } = require('../middleware/error.middleware')
const Doctor = require('../model/doctor.model')
const { sendResponse } = require('../utils/helper.utils')

exports.createDoctor = async (req, res, next) => {
  try {
    const { name, availableSlots } = req.body

    if (!name || !Array.isArray(availableSlots)) {
      throw new CustomError('Name and available slots are required', 400)
    }

    const doctor = await Doctor.create({ name, availableSlots })

    return sendResponse(res, 200, 'Doctor created successfully', doctor)
  } catch (error) {
    next(error)
  }
}

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find()

    return sendResponse(res, 200, 'Doctor fetched successfully', doctors)
  } catch (error) {
    next(error)
  }
}
