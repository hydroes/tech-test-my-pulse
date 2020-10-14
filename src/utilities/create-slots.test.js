const moment = require('moment-timezone')
moment.tz.setDefault("Europe/London")
const createSlots = require('./create-slots')
const formatSlotDate = require('./format-slot-date')

test('I should get available slots between periods', () => {

  // Moment<2021-03-01T10:00:00+00:00> Moment<2021-03-01T12:00:00+00:00>

  const expected = [
    "10:00-10:10",
    "10:12-10:22",
    "10:24-10:34",
    "10:36-10:46",
    "10:48-10:58"
  ]

  const queryStart = moment('2021-03-01T10:00:00+00:00')
  const queryEnd = moment('2021-03-01T11:00:00+00:00')
  const availabilityStart = moment('2021-03-02T07:30:00+00:00')
  const availabilityEnd = moment('2021-03-02T17:00:00+00:00')

  const result = createSlots(queryStart, queryEnd, availabilityStart, availabilityEnd)
  const convertedToDates = result.map(slot => formatSlotDate(slot.slotStartTime, slot.slotEndTime))

  expect(convertedToDates.sort()).toEqual(expected.sort());
});