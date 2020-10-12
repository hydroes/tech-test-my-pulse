const moment = require('moment')
const { INPUT_DATE_FORMAT } = require('../constants/input-date-format')

const filterByConsultant = (consultations, consultantName) => {
  return consultations.filter(consultation => {
    if (consultantName !== false) {
      return consultation.name === consultantName
    }
    // else don't filter at all
    return true
  })
}

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

// const filterAvailability = (consultations, parsedStartDateTime, parsedEndDateTime) => {
//   const availableConsultations = consultations.filter(consultation => {
//     // iterate through availabilities
//     // consultation.availability = consultation.availability.filter(availableDate => {
//     const availableSlots = consultation.availability.filter(availabilitySlot => {
//       // availabilitySlot = "2021-03-01 08:00 - 13:00"
//       console.log('-'.repeat(50), 'availabilitySlot', availabilitySlot);
//       // get start/end dates
//       const availableStartDate = getStartDateFromString(availabilitySlot)
//       // console.log('-'.repeat(50), 'availableStartDate', availableStartDate);
//       const availableEndDate = getEndDateFromString(availabilitySlot)
//       // console.log('-'.repeat(50), 'availableEndDate', availableEndDate);

//       const withInAvailableTimes = (
//         parsedStartDateTime.isSameOrAfter(availableStartDate) &&
//         parsedEndDateTime.isSameOrBefore(availableEndDate))

//       return withInAvailableTimes
//     })

//     console.log('-'.repeat(50), 'availableSlots', availableSlots);

//     // consultations.availability = availabilities
//     // console.log('-'.repeat(50), 'availabilities', availabilities);
//     return consultation

//   })

//   // console.log('-'.repeat(50), 'availableConsulations', availableConsultations);
//   return availableConsultations
// }

// const filterAvailability = (consultations, parsedStartDateTime, parsedEndDateTime) => consultations.filter(consultation => consultation.availability.filter(availabilitySlot => {
//   // availabilitySlot = "2021-03-01 08:00 - 13:00"
//   console.log('-'.repeat(50), 'availabilitySlot', availabilitySlot);
//   // get start/end dates
//   const availabilitySlotStartDate = getStartDateFromString(availabilitySlot)
//   // console.log('-'.repeat(50), 'availableStartDate', availableStartDate);
//   const availabilitySlotEndDate = getEndDateFromString(availabilitySlot)
//   // console.log('-'.repeat(50), 'availableEndDate', availableEndDate);

//   const withInAvailableTimes = (
//     parsedStartDateTime.isSameOrAfter(availabilitySlotStartDate) &&
//     parsedEndDateTime.isSameOrBefore(availabilitySlotEndDate))

//   console.log('-'.repeat(50), 'withInAvailableTimes', withInAvailableTimes);

//   return withInAvailableTimes
// }))

const addAvailableConsultationSlots = (parsedStartDateTime, parsedEndDateTime) => {

}

const filterAvailability = (consultations, parsedStartDateTime, parsedEndDateTime) => {

  const matchingConsultations = []
  consultations.forEach(consultation => {
    const availableSlots = consultation.availability.filter(availabilitySlot => {
      // availabilitySlot = "2021-03-01 08:00 - 13:00"
      // get start/end dates
      const availableStartDate = getStartDateFromString(availabilitySlot)
      const availableEndDate = getEndDateFromString(availabilitySlot)

      const withInAvailableTimes = (
        parsedStartDateTime.isSameOrAfter(availableStartDate) &&
        parsedEndDateTime.isSameOrBefore(availableEndDate))

      return withInAvailableTimes
    })

    if (availableSlots.length > 0) {
      const matchingConsultation = {
        name: consultation.name,
        // @todo: rename these to something more appropriate
        availability: availableSlots,
        availableSlots: addAvailableConsultationSlots(parsedStartDateTime, parsedEndDateTime)
      }
      matchingConsultations.push(matchingConsultation)
    }
  });


  return matchingConsultations
}



// @todo: ensure startDateTime, endDateTime are moment so comparison works
module.exports = (consultations, consultantName = false, startDateTime, endDateTime) => {

  // filter by consultant if consultantName provided
  const consultationsFiltered = filterByConsultant(consultations, consultantName)

  // console.log('-'.repeat(50), 'consultationsFiltered', consultationsFiltered);

  // filter by time 0:00am and 12:00am on 2021-03-02
  // '2021-03-01 10:00'
  const parsedStartDateTime = moment(startDateTime, 'YYYY-MM-DD hh:mm')
  const parsedEndDateTime = moment(endDateTime, 'YYYY-MM-DD hh:mm')
  const availableConsultations = filterAvailability(consultationsFiltered, parsedStartDateTime, parsedEndDateTime)

  console.log('-'.repeat(50), 'availableConsultations', availableConsultations)

  return availableConsultationSlots
}