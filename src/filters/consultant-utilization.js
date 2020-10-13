
module.exports = (consultants, appointments) => {
  const utilizations = []
  // 4. What is the percentage utilisation of each consultant each day?
  // 4. 2021-03-01: Dr. Big-Toe - 0% 
  // 2021-03-01: Dr. Leg - 5.7% 
  // 2021-03-02: Dr. Spleen - 5.7%
  // 2021-03-02: Dr. Big-Toe - 2.8% 
  // consultation:
  // {
  //   "name": "Dr. Big-Toe",
  //   "availability": [
  //     "2021-03-01 10:00 - 16:00", // @ATTENTION: TEST DATA GIVEN IS INCORRECT
  //     "2021-03-02 07:30 - 17:00" // // @ATTENTION: Should 7.30 allowed when clinic opening times is 8??
  //   ]
  // },
  // appointment:
  // {
  //   "consultant": "Dr. Big-Toe",
  //   "patient": "D. Ead",
  //   "startTime": "2021-03-02 10:48"
  // },

  // calculate total possible appointments in a day
  // get number of appointments for a consultant

  // get number of slots with breaks
  // get number of appointments
  return utilizations

}