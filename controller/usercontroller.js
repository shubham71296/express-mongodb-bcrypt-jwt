const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const User      = require('../model/user');


module.exports.userSignup = (req,res)=>{
 User.findOne({email:req.body.email},(err,result)=>{
  if(err) throw err;
  else if(result!==null){
    return res.json({msg:"email already exist!!!"})
  }
  else{
      bcrypt.hash(req.body.password,10,function(err,hash){
       if(err) throw err;
        else{
          var usernew = new User({
             name:req.body.name,
             password:hash,
             email:req.body.email,
             salary:req.body.salary
          })
           usernew
            .save()
            .then(data=>{
              console.log(data);
              res.json({
                msg:"userdata inserted!!!"
              })
            })
            .catch(err=>{
              console.log(err);
            })
        }
     })
  }
})
} 


 // bcrypt.compare(password,result[0].password,function(err,result1){
 //        if(err) throw err;
 //        else if(result1){
 //          console.log(result);
 //          console.log(result1); //here result1 return true or false
 //          jwt.sign({email:result[0].email,userId:result[0].id},'secretkey',(err,token)=>{
 //            if(err) throw err;
 //            else{
 //              localStorage.setItem('myToken',token);  
 //              console.log(token);
 //              res.render('welcome');
 //            }
 //          })
 //        }
 //        else
 //          res.send('login failed password cant match!!!');
 //      })


module.exports.userLogin = (req,res)=>{
 User.findOne({email:req.body.email},(err,result)=>{
  if(err) throw err;
  else if(result!==null){
    console.log(result);
    bcrypt.compare(req.body.password,result.password,function(err,result1){
      if(err) throw err;
      else if(result1){
        console.log(result1);
        jwt.sign({email:result.email,userId:result._id},'secretKey',(err,token)=>{
          if(err) throw err;
          else{
            console.log(token);
            res.json({
              msg:"login success....",
              token
            })
          }
        })
      }
      else
        res.json({
          msg:"login failled password cant match!!!!"
        })
    })
  }
  else
    res.json({
      msg:"login failed!!!!"
    })
 })
} 


module.exports.getAllUser = (req,res)=>{
 User.find((err,result)=>{
   if(err) throw err;
   else{
    console.log(result);
    res.json({user:result});
   }
 })
} 

module.exports.getOneUser = (req,res)=>{
 const id = req.params.id;
 User.findOne({_id:id},(err,result)=>{
  if(err) throw err;
  else{
    console.log(result);
    res.json({
      data:result
    })
  }
 })
} 

module.exports.deleteUser = (req,res)=>{
  const id = req.params.id;
  User.deleteOne({_id:id},(err)=>{
    if(err) throw err;
    else
      res.json({
        msg:"data deleted!!!!",
      })
  })
} 

module.exports.deleteAll = (req,res)=>{
  User.remove({},(err)=>{
    if(err) throw err;
    else
      res.json({
        msg:"all data deleted!!!",
      })
  })
} 

module.exports.updataUser = (req,res)=>{
 const id = req.params.id;
 User.findByIdAndUpdate({_id:id},{$set:{name:req.body.name,
                                        password:req.body.password,
                                        email:req.body.email,
                                        salary:req.body.salary}},(err)=>{
    if(err) throw err;
     else
      res.json({
        msg:"data updated successfully!!!!"
      })                                   
                                        })
} 

