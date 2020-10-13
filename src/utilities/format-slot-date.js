const consultationSettings = require('../constants/consultation-settings')

// input 2 moment date objects
module.exports = (slotStartTime, slotEndTime) => {
  return `${slotStartTime.format(consultationSettings.slotTimeFormat)}-${slotEndTime.format(consultationSettings.slotTimeFormat)}`
}
