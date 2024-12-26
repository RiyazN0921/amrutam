const AWS = require('aws-sdk')

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,
})

const sns = new AWS.SNS()

const sendSms = async (phoneNumber, message) => {
  try {
    const params = {
      Message: message,
      PhoneNumber: phoneNumber,
    }

    const result = await sns.publish(params).promise()
    console.log('SMS sent successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to send SMS:', error)
    throw error
  }
}

module.exports = { sendSms }
