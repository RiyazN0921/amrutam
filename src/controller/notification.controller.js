const notificationService = require('../services/notification.service')

const { sendResponse } = require('../utils/helper.utils')

exports.sendRescheduleOptions = async (req, res, next) => {
  try {
    const { patientId, availableSlots } = req.body
    await notificationService.sendRescheduleOptions(patientId, availableSlots)

    return sendResponse(res, 200, 'reschedule options sent')
  } catch (error) {
    next(error)
  }
}
