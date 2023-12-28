// const verifyToken=(req,res,next)=>{
//     const token = req.cookies.jwt;
//     if(!token){
//         return res.redirect('/login');

//     }
//    jwt.verify(token,'hsgdhsdvcbvcscvbncvsbnfshjcbsncdgsahdghsnvcdbxcvbchscbnsc',(err,decodedToken)=>{
//     if(err){
//         console.log(err.message);
//         return res.redirect('/login');
//     }
//     else{
//         console.log(decodedToken);
//         next();
//     }
//    })
    
// }

// module.exports=verifyToken;