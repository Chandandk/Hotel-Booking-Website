// user name , email, address, isAdmine== false (agar wo true karta hai to admin ho jayega otherwise wo normal user rahega.)

const userSchema = new mongoose.Schema({
    
})
const userRecord = new mongoose.model('userRecord',userSchema);

module.exports = userRecord;