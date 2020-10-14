
const moment = require('moment-timezone')
moment.tz.setDefault("Europe/London")
const { getStartDateFromString } = require('../utilities/date-parser')
const consultationSettings = require('../constants/consultation-settings')
const filterAvailableConsultations = require('./by-available-consultations-date-time')
const filterByConsultantAndDate = require('./appointments-by-consultant-date')

module.exports = (consultants, appointments) => {
  const utilizations = []

  // get unique days for days all all days worked
  const workDates = []
  consultants.forEach(consultant => {
    // work out business hours for the day and query free slots by them
    consultant.availability.forEach(availableDate => {
      const dayStart = getStartDateFromString(availableDate)
      const workDay = dayStart.format('YYYY-MM-DD')
      workDates.push(workDay)
    })
  });

  // get unique work dates
  const uniqueWorkDates = new Set(workDates)
  const uniqueWorkDatesArr = [...uniqueWorkDates]

  // iterate through work dates as clinic opening times
  uniqueWorkDatesArr.forEach(uniqueDay => {
    // iterate through each consultant
    consultants.forEach(consultant => {
      // build work day hours and query by them
      const startOfDay = `${uniqueDay} ${consultationSettings.serviceTimeStartHour}`
      const endOfDay = `${uniqueDay} ${consultationSettings.serviceTimeEndHour}`
      const freeSlots = filterAvailableConsultations(consultants, appointments, consultant.name, startOfDay, endOfDay, false)
      // count number of free slots for date
      let totalFreeSlots = 0
      if (freeSlots && freeSlots[0] && freeSlots[0].slots && freeSlots[0].slots.length) {
        totalFreeSlots = freeSlots[0].slots.length
      }
      // count number of bookings for date
      const numberOfBookings = filterByConsultantAndDate(appointments, consultant.name, uniqueDay).length
      let percentage = '0';
      // dont divide by zero
      if (totalFreeSlots > 0) {
        // percentage = (numOfAppointments / consultationsInADay) * 100
        percentage = ((numberOfBookings / totalFreeSlots) * 100).toFixed(1)
      }

      const utilization = {
        percentage: `${consultant.name} - ${percentage}%`,
        date: uniqueDay
      }
      utilizations.push(utilization)
    })
  })

  // format utilizations
  const formattedUtilizations = utilizations.map(utilization => {
    return { [utilization.date]: utilization.percentage }
  })

  // get number of slots with breaks
  // get number of appointments
  return formattedUtilizations

}