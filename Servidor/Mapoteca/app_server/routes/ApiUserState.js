var express = require('express');
var router = express.Router();
const apiUser=require('../controllers/userStateAPI');
const middleware=require('../auth/middleware');

router.get('/getUserState',middleware,apiUser.getUserState);
router.post('/updateStyle',middleware,apiUser.setUserStateStyle);
router.post('/updateLocal',middleware,apiUser.setUserStateLocal);

router.get('/userLogged',function(req,res){
  if (req.user==undefined){
    res.json({});
  }
  else{
    res.json({
      user:req.user
    });
  }
});

module.exports=router;
