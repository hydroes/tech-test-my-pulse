const consultantUtilization = require('./consultant-utilization')
const consultations = require('../data/consultations')
const appointments = require('../data/appointments')

// 'What are the available consultation slots for Dr. Big-Toe between 10:00 and 12:00 on 2021-03-02?'
test.only('filter by consultant and specific date/time and return available consultation slots', () => {

  const expected = [{
    '2021-03-01': 'Dr. Big-Toe - 0% ',
    '2021-03-01': 'Dr. Leg - 5.7% ',
    '2021-03-02': 'Dr. Big-Toe - 2.8%',
    '2021-03-02': 'Dr. Spleen - 5.7%',
  }]

  const result = consultantUtilization(consultations, appointments)

  console.log('-'.repeat(50), 'result', result);

  expect(result.sort()).toEqual(expected.sort());
});