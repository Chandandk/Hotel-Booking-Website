const mongoose = require('mongoose');


const signupSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    token:String

})


const signupRecord = new mongoose.model("signupRecord", signupSchema);

module.exports=signupRecord;