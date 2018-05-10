var express = require('express');
var router = express.Router();

const cntrlMain=require('../controllers/main');
const render=require('../controllers/userStateAPI');

/* GET home page. */
router.get('/',function(req,res,next){
  if (req.isAuthenticated()){
      render.renderStyle(req,res);
  }else{
    res.render('index1',{title:'GiraBahiense'})
  }
});

module.exports = router;
