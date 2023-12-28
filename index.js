const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const router=express.Router();
const hbs = require('hbs');
const jwt=require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const signupRecord = require('./models/signupschema');
const Host_Register = require("./models/hostadd");
const cookieparser=require('cookie-parser');
require('./config/db');
require('dotenv').config();
// const bookingRecord = require('./models/booking_model');
// const hotelRecord = require('./models/hotel_model');
// const userRecord = require('./models/user_model');

//---------------------middleware-----------------------------
app.use(express.json());
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname,'public/css')));
app.use(express.urlencoded({ extnded : true}));
// -----------------------------------------------------------

app.set('views', path.join(__dirname, './templates/views'));
const templates_path = path.join(__dirname,'/templates/views');
const partials_path = path.join(__dirname,'/templates/partials');
hbs.registerPartials(partials_path);
// ---------------file path directory--------------------------

// --------------------set view engine-------------------------
// app.set('view engine','ejs')
app.set('view engine','hbs')
app.set('views',templates_path)


// -------------verifty Token ------------------------------------
async function hashPass(password){
    const res = await bcryptjs.hash(password,10)
    return res
  }
  
  async function compare(password,hashPass){
    const res = await bcryptjs.compare(password,hashPass);
    return res
  }

// -----------------------Mongodb  connection -----------------

const { MongoClient } = require('mongodb');
 async function main(){
    // mongobd uri fetch----------------
    const uri = 'mongodb+srv://Chandandk:chandan07@mongodbdemo.x9mkzbe.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const findData = await client.db('sample_airbnb').collection('listingsAndReviews').find().limit(20).toArray();
       
        return findData;

    } catch (error) {
        console.log(error,'Data not Found');
    }
} 

async function findDetails(id){
    // mongobd uri fetch
    const uri = 'mongodb+srv://Chandandk:chandan07@mongodbdemo.x9mkzbe.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        var result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ _id: id });
        //console.log(result);
        return result;

    } catch (error) {
        console.log(error,'Data not Found');
    }
} 
app.get('/' , async (req, res) => {
  res.render('welcome')

});

app.get('/details/:id',async(req,res)=>{
    const data = await findDetails(req.params.id);
    res.render('details',{data:data})
});

// -----------------------Rendering Path-------------------------------------------------

app.get('/index',async(req,res)=>{
  let data = await main();
  let data2 = await findDetails();
  res.render('index',{data,data2});
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
  try{
      const {  email, password } = req.body;
      console.log('details', email, password);
      
      const userDetails=await signupRecord.findOne({email:email},{password:password});
      const generateToken=(userData)=>{
          return jwt.sign(userData,"SECRET_KEY",{expiresIn:'1h'});
          }
          console.log('userdetails',userDetails);
          const token=generateToken({password:userDetails.password,email:email});
          console.log('token is ',token);
          res.cookie('email',userDetails.email);
          res.cookie('password',userDetails.password);

          res.cookie('jwt',token,{httponly:true});

      if(userDetails){
          // res.redirect('destinations',{username:userDetails.username});
          //  req.session.username=userDetails.username;
          res.redirect('/index');
      }
  }
  catch(e){
      console.log(e);
  }
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post("/signup", async (req, res) => {
  try {
    const check = await signupRecord.findOne({ firstName: req.body.firstName });

    if (check) {
      res.send("User already exists");
    } else {
      const hashedPassword = await hashPass(req.body.password);

      const token = jwt.sign({ firstName: req.body.firstName }, "SECRET_KEY");

      const user = {
        firstName: req.body.firstName,
        email:req.body.email,
        password: hashedPassword,
        token: token,
      };

      await signupRecord.insertMany(user);
      res.redirect('/');
    }
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.get('/details',(req,res)=>{
  res.render('details')
});
app.get('/host-form',(req,res)=>{
  res.render('host-form')
});

app.get('/help',(req,res)=>{
    res.render('help')
})
app.get('/host',(req,res)=>{
    res.render('host')
})
app.get('/room',(req,res)=>{
    res.render('room')
})
app.get('/welcome',(req,res)=>{
    res.render('welcome')
})

// -------------------Crud opertation ----------------------------------
async function FindData3() {
  const uri = "mongodb+srv://Chandandk:chandan07@mongodbdemo.x9mkzbe.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();

  var result1 = await client.db("user_info").collection("host_datas").find().toArray();
  return result1
}
 
async function FindData4(HomeName) {
  const uri = "mongodb+srv://atulnew:topology@cluster0.yylrcsq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();

  var result2 = await client.db("user_info").collection("host_datas").findOne({HomeName});
  return result2
}

app.get('/host_page', async (req, res) => {
  let data2 = await FindData3();
  // console.log(data1);
  res.render('host_page', {
    data2:data2,
  });
  
});

app.get('/adduser',(req,res)=>{
  res.render('adduser')
})

app.post('/hostinform', async (req, res) => {

  const HostSchema = new Host_Register({
    HomeName: req.body.hname,
    Location: req.body.location,
    PropertyType: req.body.ptype,
    Homeurl: req.body.Imageurl,
    minimum_nights: req.body.mnights,
    neighbourhood_overview: req.body.overview,
    cancellation_policy:req.body.policy,
    Price: req.body.price,
    
  });
  const registered = await HostSchema.save();
   if(registered){
    
    res.redirect('/host_page');
  }else{
    res.redirect('/');
  }
 
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data2 = await Host_Register.findById(id);

    if (!data2) {
      return res.redirect("/host_page");
    }

    res.render("edituser", {
      title: 'Edit User',
      data2: data2,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/host_page");
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Host_Register.findOneAndDelete({ _id: id });

    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }

    res.redirect('/host_page');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/hostinform/:id',async(req,res) =>{
  let id = req.params.id;
 await Host_Register.findOneAndUpdate({_id:id},{
    HomeName: req.body.hname,
    Location: req.body.location,
    PropertyType: req.body.ptype,
    Homeurl: req.body.Imageurl,
    minimum_nights: req.body.mnights,
     cancellation_policy:req.body.policy,
    Price: req.body.price,
  })
  if (id != id) {
    console.log(err);
} else {
  
    res.redirect('/host_page');
}
       
  }); 

// ---------------Crud End ----------------------------------------------



app.listen(PORT,()=>{console.log(`Server Listening At Port : ${PORT}`)});