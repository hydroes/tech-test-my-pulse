const moment = require('moment')
const { INPUT_DATE_FORMAT } = require('../constants/input-date-format')
const { getStartDateFromString, getEndDateFromString } = require('../utilities/date-parser')
const createSlots = require('../utilities/create-slots')
const formatSlotDate = require('../utilities/format-slot-date')


const filterByConsultant = (consultations, consultantName) => {
  return consultations.filter(consultation => {
    if (consultantName !== false) {
      return consultation.name === consultantName
    }
    // else don't filter at all
    return true
  })
}

const filterAvailability = (consultations, queryStartDateTime, queryEndDateTime) => {

  const matchingConsultations = []
  consultations.forEach(consultation => {
    const availableSlots = consultation.availability.filter(availabilitySlot => {
      // availabilitySlot = "2021-03-01 08:00 - 13:00"
      // get start/end dates
      const availableStartDate = getStartDateFromString(availabilitySlot)
      const availableEndDate = getEndDateFromString(availabilitySlot)

      const withInAvailableTimes = (
        queryStartDateTime.isSameOrAfter(availableStartDate) &&
        queryEndDateTime.isSameOrBefore(availableEndDate))

      return withInAvailableTimes
    })

    if (availableSlots.length > 0) {
      const availabilityStartTime = getStartDateFromString(availableSlots[0])
      const availabilityEndTime = getEndDateFromString(availableSlots[0])
      const matchingConsultation = {
        name: consultation.name,
        // @todo: rename these to something more appropriate
        availability: availableSlots,
        allSlots: createSlots(queryStartDateTime, queryEndDateTime, availabilityStartTime, availabilityEndTime)
      }
      matchingConsultations.push(matchingConsultation)
    }
  });


  return matchingConsultations
}

const addUnbookedAppointmentSlots = (consultantsData, appointments) => consultantsData.map(consultantData => {
  // create a new prop of unbooked slots which equals (allSlots - appointments)
  const unbookedSlots = []
  const consultantAppointments = appointments.filter(appointment => appointment.consultant === consultantData.name)

  consultantData.allSlots.forEach(availableSlot => {
    // get appointments for cur consultant
    // if appointment startTime is!within the slot times then add it to unbooked
    consultantAppointments.forEach(appointment => {
      const appointmentStartTime = getStartDateFromString(appointment.startTime)
      const appointmentBooked = appointmentStartTime.isSameOrAfter(availableSlot.slotStartTime)
        && appointmentStartTime.isSameOrBefore(availableSlot.slotEndTime)
      if (!appointmentBooked) {
        unbookedSlots.push(formatSlotDate(availableSlot.slotStartTime, availableSlot.slotEndTime))
      }
    })

  })

  consultantData.unbookedSlots = unbookedSlots

  return consultantData
})

// @todo: ensure startDateTime, endDateTime are moment so comparison works
module.exports = (consultations, appointments, consultantName = false, queryStartDateTime, queryEndDateTime) => {

  // filter by consultant if consultantName provided
  const consultationsFiltered = filterByConsultant(consultations, consultantName)

  // filter by time 0:00am and 12:00am on 2021-03-02
  // '2021-03-01 10:00'
  const parsedQueryStartDateTime = moment(queryStartDateTime, 'YYYY-MM-DD hh:mm')
  const parsedEndDateTime = moment(queryEndDateTime, 'YYYY-MM-DD hh:mm')

  const consultantsData = filterAvailability(consultationsFiltered, parsedQueryStartDateTime, parsedEndDateTime)
  const consultantsWithUnbookedSlots = addUnbookedAppointmentSlots(consultantsData, appointments)

  const consulationsInfo = consultantsWithUnbookedSlots.map(consultantInfo => {
    return {
      name: consultantInfo.name,
      slots: consultantInfo.unbookedSlots
    }
  })


  return consulationsInfo
}