# tech-test-my-pulse

# Installation:
 pre-requisites: node js > 10

1) Unzip and cd into unzipped directory
To Install
2) npm i
To run tests:
3) npm t

app config can be changed by editing the consultation-settings.js :
break time and consultation times can be edited there.

  consultationTime: { minutes: 10 },
  breakBetweenConsultations: { minutes: 2 },
  breakAfterConsultations: { hours: 1 },
  breakThreshold: 4,
  slotTimeFormat: 'hh:mm',
  serviceTimeStartHour: '08:00',
  serviceTimeEndHour: '18:00'


To query the db use the following examples:

1) What appointments have been arranged for Dr. Leg on 2021-03-01? 
node ./src/index.js --appointment-by-doctor 'Dr. Leg' --appointment-by-date 2021-03-01
Appointments for Dr. <Dr. Leg> on date <2021-03-01> [ { consultant: 'Dr. Leg',
    patient: 'B. R. Oken',
    startTime: '2021-03-01 08:36' },
  { consultant: 'Dr. Leg',
    patient: 'R. Ubber-Glove',
    startTime: '2021-03-01 16:48' } ]


2) What are the available consultation slots for Dr. Big-Toe between 10:00am and 12:00am on 2021-03-02? 
node ./src/index.js --available-consultation-by-doctor-filter 'Dr. Big-Toe' --available-consultation-slots-start-date '2021-03-02 10:00' --available-consultation-slots-end-date '2021-03-02 12:00'
Available slots between <2021-03-02 10:00> and <2021-03-02 12:00> [ { name: 'Dr. Big-Toe',
    slots:
     [ '10:00-10:10', '10:12-10:22', '10:24-10:34', '10:36-10:46' ] } ]
Available slots between <program.availableConsultationSlotsStartDate> and <program.availableConsultationSlotsEndDate> [ { name: 'Dr. Big-Toe',
    slots:
     [ '10:00-10:10', '10:12-10:22', '10:24-10:34', '10:36-10:46' ] } ]

3) What are the available consultation slots between 3pm and 5pm on 2021-03-01 across all consultants?
node ./src/index.js  --available-consultation-slots-start-date '2021-03-02 10:00' --available-consultation-slots-end-date '2021-03-02 12:00'
Available slots between <2021-03-02 10:00> and <2021-03-02 12:00> [ { name: 'Dr. Big-Toe',
    slots:
     [ '10:00-10:10', '10:12-10:22', '10:24-10:34', '10:36-10:46' ] },
  { name: 'Dr. Spleen',
    slots:
     [ '10:00-10:10',
       '10:00-10:10',
       '10:12-10:22',
       '10:12-10:22',
       '10:24-10:34',
       '10:24-10:34',
       '10:36-10:46',
       '10:36-10:46',
       '10:48-10:58',
       '10:48-10:58',
       '11:00-11:10',
       '11:00-11:10',
       '11:12-11:22',
       '11:12-11:22',
       '11:24-11:34',
       '11:24-11:34',
       '11:36-11:46',
       '11:36-11:46',
       '11:48-11:58',
       '11:48-11:58' ] } ]

4) What is the percentage utilisation of each consultant each day?
node ./src/index.js --utilization
 [ { '2021-03-01': 'Dr. Big-Toe - 0.0%' },
  { '2021-03-01': 'Dr. Leg - 2.3%' },
  { '2021-03-01': 'Dr. Spleen - 0%' },
  { '2021-03-02': 'Dr. Big-Toe - 0%' },
  { '2021-03-02': 'Dr. Leg - 0%' },
  { '2021-03-02': 'Dr. Spleen - 2.5%' } ]


Prefix:
I feel this is not a great assertion of my coding ability. Its more a test of if I can write code after 2am in the morning because its the only free time i have. I would definitely rewrite it all with smaller functions that do less and could be composed. Speaking of composition I did not use any libraries for this except for a date library to help with dates.
All the tests pass except for the percentage utilizations which are slightly out.

There are a few issues with the test that I would like to mention:
1) there is a bug in the test data:
"name": "Dr. Big-Toe",
    "availability": [
      "2021-03-01 10:00 - 16:00", -- SHOULD BE 17:00 if question 3 should be answered correctly
       "2021-03-02 07:30 - 17:00" // // @ATTENTION: Should 7.30 allowed when clinic opening times is 8??

tech test - appointment management


MyPulse Technical Interview - Problem
Statement

Context
MyPulse is building a flexible tele-medicine platform to be sold around the world. To be
economically viable, the platform must ensure that medical professionals are adequately
utilised. As such, efficient appointment scheduling is key.
Guidelines
- The following exercise contains some example input and expected outputs, however
the solution should be extendable to similar inputs and outputs.
- You can solve the problem in the language of your choice, although we might not be
familiar with it, so be prepared to explain it!
- Please submit the solution as an email attachment (.zip)
- What we will look for:
- a good breakdown of the core domain,
- a simple interface, we don’t expect UIs, web APIs or database integration
- a flexible solution, that can be extended in various different ways,
- a well tested solution,
- a simple solution, however a library shouldn’t solve the problem for you
- clear instructions on how to run the solution and tests,
- a brief explanation of your design and assumptions,
- We want our hiring practices to be fair. To ensure this, please do not publically share
the problem or solution.
Problem
Initially MyPulse plans to launch with only GPs on the platform. GP consultations typically
last for 10 minutes and consultants are able to do 5 consultations per hour with a 2 minute
break between each. Every 3 hours, consultants need a break of an hour. The service is
planned to be available from 8am to 6pm Monday to Friday.
Example input:
Note: you don’t need to parse this text in this format. Feel free to convert to another format if
needed. However, it should be easy to run your solution with different inputs.

---
consultants:
- name: "Dr. Big-Toe"
availability:
- "2021-03-01 10:00 - 16:00"
- "2021-03-02 07:30 - 17:00"
- name: "Dr. Leg"
availability:
- "2021-03-01 08:00 - 13:00"
- "2021-03-01 15:00 - 18:00"
- name: "Dr. Spleen"
availability:
- "2021-03-02 08:00 - 17:00"
appointments:
- patient: "N. Oarms"
consultant: "Dr. Spleen"
startTime: "2021-03-02 13:12"
- patient: "B. R. Oken"
consultant: "Dr. Leg"
startTime: "2021-03-01 08:36"
- patient: "D. Ead"
consultant: "Dr. Big-Toe"
startTime: "2021-03-02 10:48"
- patient: "Sir Inge"
consultant: "Dr. Spleen"
startTime: "2021-03-02 12:24"
- patient: "R. Ubber-Glove"
consultant: "Dr. Leg"
startTime: "2021-03-01 16:48"

Questions:
Using the above information, please make sure your solution is able to answer the following
1. What appointments have been arranged for Dr. Leg on 2021-03-01?
2. What are the available consultation slots for Dr. Big-Toe between 10:00am and
12:00am on 2021-03-02?
3. What are the available consultation slots between 3pm and 5pm on 2021-03-01
across all consultants?
4. What is the percentage utilisation of each consultant each day?

Example output:
1. B. R. Oken at 08:36
R. Ubber-Glove at 16:48
2. 10:00-10:10, 10:12-10:22, 10:24-10:34, 10:36-10:46,
3. Dr. Big-Toe:
15:00-15:10, 15:12-15:22, 15:24-15:34, 15:36-15:46,
15:48-15:58
Dr. Leg:
15:00-15:10, 15:12-15:22, 15:24-15:34, 15:36-15:46,
15:48-15:58, 16:00-16:10, 16:12-16:22, 16:24-16:34,
16:36-16:46
4. 2021-03-01: Dr. Big-Toe - 0%
2021-03-01: Dr. Leg - 5.7%
2021-03-02: Dr. Big-Toe - 2.8%
2021-03-02: Dr. Spleen - 5.7%