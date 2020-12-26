const express =  require('express');
const router  =  express.Router();
const auth       = require('../middleware/authentication');
const userRoutes = require('../controller/usercontroller');

router.post('/usersignup',                           userRoutes.userSignup);
router.get('/getalluser'         , auth.verify ,     userRoutes.getAllUser);
router.get('/getoneuser/:id'     , auth.verify ,     userRoutes.getOneUser);
router.delete('/deleteuser/:id'  , auth.verify ,     userRoutes.deleteUser);
router.delete('/deleteall',                          userRoutes.deleteAll);
router.put('/updateuser/:id'     , auth.verify ,     userRoutes.updataUser);
router.post('/userlogin',                            userRoutes.userLogin);

module.exports = router;

