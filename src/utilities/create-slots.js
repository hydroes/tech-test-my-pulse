const moment = require('moment-timezone')
moment.tz.setDefault("Europe/London")
const { getStartDateFromString, getEndDateFromString } = require('./date-parser')
const consultationSettings = require('../constants/consultation-settings')

// adds consultations to slots array recursively 
const addSlots = (overallEndTime, slots) => {
  // get last slot end time
  // dont modify slots when getting last entry
  const slotsCopy = [...slots]
  const lastSlot = slotsCopy.pop()
  const lastSlotEndTime = lastSlot.slotEndTime
  let curSlotStart = addInBetweenConsultationBreak(lastSlotEndTime)
  const curSlotEnd = addConsultationTime(curSlotStart)

  const slot = {
    slotStartTime: curSlotStart,
    slotEndTime: curSlotEnd
  }

  slots.push(slot)

  // check future slot start as well isSameOrAfter
  const nextSlotStart = addConsultationTime(addInBetweenConsultationBreak(curSlotEnd))

  // if (curSlotEnd.isBefore(overallEndTime) === true) {
  if (nextSlotStart.isSameOrAfter(overallEndTime) === false) {
    addSlots(overallEndTime, slots)
  }

  // add breakBetweenConsultations
  // add breakAfterConsultations
  // add consultationTime
  // if slotEndTime is less than overall endTime then add slot to slots and call self
  // 
}

const addInBetweenConsultationBreak = (timeToAddOnto) => {
  const slotWithBreak = moment(timeToAddOnto)
  slotWithBreak.add(consultationSettings.breakBetweenConsultations)
  return slotWithBreak
}

const addConsultationTime = (timeToAddOnto) => {
  const slotEndTime = moment(timeToAddOnto)
  slotEndTime.add(consultationSettings.consultationTime)
  return slotEndTime
}

const removeBreakTimeFromSlots = (availabilityStartTime, availabilityEndTime, slots) => {
  const fullSlots = [...slots]
  const slotsWithBreaks = []
  const startTime = moment(availabilityStartTime)
  let i = 0
  while (startTime.isBefore(availabilityEndTime)) {
    startTime.add(1, 'hours')
    i++
    if (i % consultationSettings.breakThreshold === 0) {
      // remove slots within this break time
      fullSlots.forEach((slot, index) => {
        if (slot.slotStartTime.hour() === startTime.hour() || slot.slotEndTime.hour() === startTime.hour()) {
          delete fullSlots[index]
        }
      })
    }
  }

  return fullSlots
}

module.exports = (queryStartDateTime, queryEndDateTime, availabilityStartTime, availabilityEndTime) => {
  // sample 15:00-15:10, 15:12-15:22, 15:24-15:34, 15:36-15:46, 15:48-15:58 
  // define first slot
  const firstSlotEndTime = addConsultationTime(queryStartDateTime)

  let slots = [{
    slotStartTime: moment(queryStartDateTime),
    slotEndTime: firstSlotEndTime
  }]

  // recursively add slots as needed
  addSlots(queryEndDateTime, slots)

  // return slots with moment objects (they can be formatted later)

  // @todo: remove break time slots
  const slotsWithBreakGaps = removeBreakTimeFromSlots(availabilityStartTime, availabilityEndTime, slots)

  return slotsWithBreakGaps
}