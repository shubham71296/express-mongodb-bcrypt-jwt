const express    =  require('express');
const app        =  express();
const mongoose   =  require('mongoose');
const bodyParser =  require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended:true
}));


const URL="mongodb://localhost:27017/userDb";
mongoose.connect(URL);


app.listen('3000',()=>{
	console.log("server running on port 3000....");
})


const userroutes1 = require('./routes/userroutes');


//datbase shubham,table loginnew

//app.use('/user',userroutes1);
app.use('/user',userroutes1);