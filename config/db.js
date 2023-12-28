const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/hotelManagement')
mongoose.connect('mongodb+srv://Chandandk:chandan07@mongodbdemo.x9mkzbe.mongodb.net/user_info?retryWrites=true&w=majority')
.then(()=>{console.log('connection established')})
.catch((e)=>{e,'connection failed'});

