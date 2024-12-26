const patientModel = require('../model/patient.model')
const emailSender = require('../utils/emailSender.utils')
const smsSender = require('../utils/smsSender.utils')

const sendRescheduleOptions = async (patientId, availableSlots) => {
  const patient = await patientModel.findById(patientId)

  const emailContent = `Dear ${patient.name}, 
    Your appointment was missed. Here are available slots for rescheduling: ${availableSlots.join(
      ', ',
    )}`

  await emailSender.sendEmail(
    patient.email,
    'Reschedule Your Appointment',
    emailContent,
  )

  const smsContent = `Your appointment was missed. Available slots for rescheduling: ${availableSlots.join(
    ', ',
  )}`
  await smsSender.sendSms(patient.phoneNumber, smsContent)
}

module.exports = { sendRescheduleOptions }
