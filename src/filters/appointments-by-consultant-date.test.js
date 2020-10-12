const filterByConsultantAndDate = require('./appointments-by-consultant-date')
const appointments = require('../data/appointments.json')

// filter appointments by consultant and specific date
test('What appointments have been arranged for Dr. Leg on 2021-03-01?', () => {

  const expected = [
    {
      "patient": "B. R. Oken",
      "consultant": "Dr. Leg",
      "startTime": "2021-03-01 08:36"
    },
    {
      "patient": "R. Ubber-Glove",
      "consultant": "Dr. Leg",
      "startTime": "2021-03-01 16:48"
    }
  ]

  const result = filterByConsultantAndDate(appointments, 'Dr. Leg', '2021-03-01')

  expect(result.sort()).toEqual(expected.sort());
});