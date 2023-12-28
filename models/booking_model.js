// date, amount ,no of rooms booked , refID(kaun se hotel me booking kiya hai), refID of user.
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    
})
const bookingRecord = new mongoose.model('bookingRecord',bookingSchema);

module.exports = bookingRecord;