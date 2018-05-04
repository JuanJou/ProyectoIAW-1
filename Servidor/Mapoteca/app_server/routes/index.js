var express = require('express');
var router = express.Router();

const cntrlMain=require('../controllers/main');

/* GET home page. */
router.get('/',function(req,res,next){
  res.render('index',{title:'GiraBahiense'})
});

module.exports = router;
