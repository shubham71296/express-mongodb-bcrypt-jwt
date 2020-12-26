const jwt     =   require('jsonwebtoken');


module.exports.verify = (req, res, next)=>{
  const bearerHeader = req.headers['authorization'];
  //console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
     //console.log(bearerToken);
     //console.log(req.token);
     jwt.verify(req.token, 'secretKey', (err, authData) => {
       if(err) {
         return res.json({'err':err});
       }
       else{
	           req.authData = authData;
	           console.log(req.authData);
	           console.log(authData);
	           next();
           }
      });
    }
    else {
      res.json({msg:'Please provide valid token'});
    }
  
}
