const express = require('express')

const notificationController = require('../controller/notification.controller')

const notificationRouter = express.Router()

notificationRouter.post(
  '/send-reschedule-options',
  notificationController.sendRescheduleOptions,
)

module.exports = notificationRouter
