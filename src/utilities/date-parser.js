const moment = require('moment')

// "2021-03-01 08:00 - 13:00"
const getStartDateFromString = (date) => {
  const startMatch = date.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/g)
  const parsedStart = moment(startMatch[0], 'YYYY-MM-DD hh:mm')
  return parsedStart

}
// "2021-03-01 08:00 - 13:00"
const getEndDateFromString = (date) => {
  const year = date.match(/\d{4}-\d{2}-\d{2}/g)
  const endTime = date.match(/\d{2}:\d{2}$/g)

  const parseEnd = moment(`${year} ${endTime}`, 'YYYY-MM-DD hh:mm')
  return parseEnd

}

module.exports = {
  getStartDateFromString,
  getEndDateFromString
}