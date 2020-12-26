const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
  name    :String,
  password: String,
  email   : String,
  salary  :Number
   
});

module.exports=mongoose.model('user',userSchema);