var express = require('express');
var router = express.Router();
const apiUser=require('../controllers/userStateAPI');
const middleware=require('../auth/middleware');

router.get('/getUserState',middleware,apiUser.getUserState);
router.post('/updateStyle',middleware,apiUser.setUserStateStyle);
router.post('/updateLocal',middleware,apiUser.setUserStateLocal);


module.exports=router;
