// localhost: 5000/api/user/register

const { Router } = require("express");

Router.get('/register', (req,res)=>{
    //logic for registeration
    // throw error if user is not providing username,password,email these are madatory field need to be filled.
})
// localhost: 5000/api/user/login (JWT authentication) it will generate token and user details in the cookies

// localhost:5000/api/user/admin

//localhost:5000/api/user/(GET) //get all user