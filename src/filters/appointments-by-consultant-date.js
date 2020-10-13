const moment = require('moment')
const { INPUT_DATE_FORMAT } = require('../constants/input-date-format')

module.exports = (appointments, consultantName, dateFilter) => {
  return appointments.filter(appointment => {
    const parsedDate = moment(appointment.startTime, INPUT_DATE_FORMAT).format('YYYY-MM-DD', true)
    return (appointment.consultant === consultantName && parsedDate === dateFilter)
  })
}