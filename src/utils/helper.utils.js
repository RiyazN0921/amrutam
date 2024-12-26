const dayjs = require('dayjs')

exports.getToday = (returnType, format = 'DD-MM-YYYY') => {
  const today = dayjs()
  switch (returnType) {
    case 'date':
      return today.toDate()
    case 'dayjs':
      return today
    default:
      return today.format(format).toString()
  }
}

exports.sendResponse = (res, statusCode, message, data = null) => {
  const response = { message }

  if (data) {
    response.data = data
  }

  return res.status(statusCode).json(response)
}
