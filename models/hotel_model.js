// hotel name, hotel address , no of rooms, prices , rate , images(img_url)
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    
})
const hotelRecord = new mongoose.model('hotelRecord',hotelSchema);

module.exports = hotelRecord;