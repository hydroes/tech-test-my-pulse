const filterAvailableConsultations = require('./by-available-consultations-date-time')
const consultations = require('../data/consultations.json')

// 'filter by consultant and specific date/time and return available consultation slots'
test.only('What are the available consultation slots for Dr. Big-Toe between 10:00 and 12:00 on 2021-03-02?', () => {

  const expected = [
    "10:00-10:10",
    "10:12-10:22",
    "10:24-10:34",
    "10:36-10:46"
  ]

  const result = filterAvailableConsultations(consultations, 'Dr. Big-Toe', '2021-03-01 10:00', '2021-03-01 12:00')
  console.log('-'.repeat(50), 'result', result);

  expect(result.sort()).toEqual(expected.sort());
});

test.skip('What are the available consultation slots between 3pm and 5pm on 2021-03-01 across all consultants?', () => {

  const expected = [
    "10:00-10:10",
    "10:12-10:22",
    "10:24-10:34",
    "10:36-10:46"
  ]

  const result = filterAvailableConsultations(consultations, false, '2021-03-01 15:00', '2021-03-01 17:00')
  console.log('-'.repeat(50), 'result', result);

  expect(result.sort()).toEqual(expected.sort());
});