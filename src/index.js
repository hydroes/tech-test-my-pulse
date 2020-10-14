const moment = require('moment-timezone')
moment.tz.setDefault("Europe/London")

const consultations = require('./data/consultations')
const appointments = require('./data/appointments')
const consultantUtilization = require('./filters/consultant-utilization')
const filterByConsultantAndDate = require('./filters/appointments-by-consultant-date')
const filterAvailableConsultations = require('./filters/by-available-consultations-date-time')

const { program } = require('commander');
program.version('0.0.1');

program.option('--utilization', 'output consultant utilization by day');

program.option('--appointment-by-doctor <type>', 'filter appointments by doctor');
program.option('--appointment-by-date <type>', 'filter appointments by date');

program.option('--available-consultation-by-doctor-filter <type>', 'get available consultation slots for a specific doctor');
program.option('--available-consultation-slots-start-date <type>', 'get available consultation slots from a start date eg: "2021-03-02 10:00"');
program.option('--available-consultation-slots-end-date <type>', 'get available consultation slots from an end date eg: "2021-03-02 12:00"');
program.parse(process.argv);


if (program.utilization === true) {
  console.log('Utilization by day', consultantUtilization(consultations, appointments));
}

if (program.appointmentByDoctor && program.appointmentByDate) {
  console.log(
    `Appointments for Dr. <${program.appointmentByDoctor}> on date <${program.appointmentByDate}>`,
    filterByConsultantAndDate(appointments, program.appointmentByDoctor, program.appointmentByDate))
}
// '2021-03-02 10:00', '2021-03-02 12:00'
if (program.availableConsultationSlotsStartDate && program.availableConsultationSlotsEndDate && !program.availableConsultationByDoctorFilter) {
  console.log(`Available slots between <${program.availableConsultationSlotsStartDate}> and <${program.availableConsultationSlotsEndDate}>`,
    filterAvailableConsultations(consultations, appointments, false, program.availableConsultationSlotsStartDate, program.availableConsultationSlotsEndDate, true))
}

if (program.availableConsultationSlotsStartDate && program.availableConsultationSlotsEndDate && program.availableConsultationByDoctorFilter) {
  console.log(`Available slots between <${program.availableConsultationSlotsStartDate}> and <${program.availableConsultationSlotsEndDate}>`,
    filterAvailableConsultations(consultations, appointments, program.availableConsultationByDoctorFilter, program.availableConsultationSlotsStartDate, program.availableConsultationSlotsEndDate, true))
}


// What are the available consultation slots for Dr. Big-Toe between 10:00am and 12:00am on 2021-03-02? 