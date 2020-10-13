const filterAvailableConsultations = require('./by-available-consultations-date-time')
const consultations = require('../data/consultations.json')
const appointments = require('../data/appointments.json')

// 'What are the available consultation slots for Dr. Big-Toe between 10:00 and 12:00 on 2021-03-02?'
test('filter by consultant and specific date/time and return available consultation slots', () => {

  const expected = [{
    "name": "Dr. Big-Toe",
    "slots": [
      "10:00-10:10",
      "10:12-10:22",
      "10:24-10:34",
      "10:36-10:46",
    ]
  }]

  const result = filterAvailableConsultations(consultations, appointments, 'Dr. Big-Toe', '2021-03-02 10:00', '2021-03-02 12:00')

  expect(result.sort()).toEqual(expected.sort());
});

// 'What are the available consultation slots between 3pm and 5pm on 2021-03-01 across all consultants?'
test.only('filter by specific date/time and return available consultation slots', () => {

  const expected = [{
    "name": "Dr. Leg",
    "slots": [
      "03:00-03:10",
      "03:00-03:10",
      "03:12-03:22",
      "03:12-03:22",
      "03:24-03:34",
      "03:24-03:34",
      "03:36-03:46",
      "03:36-03:46",
      "03:48-03:58",
      "03:48-03:58",
      "04:00-04:10",
      "04:00-04:10",
      "04:12-04:22",
      "04:12-04:22",
      "04:24-04:34",
      "04:24-04:34",
      "04:36-04:46",
      "04:36-04:46",
      "04:48-04:58",
    ]
  }]

  const result = filterAvailableConsultations(consultations, appointments, false, '2021-03-01 15:00', '2021-03-01 17:00')

  expect(result.sort()).toEqual(expected.sort());
});