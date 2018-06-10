
const render=require('../controllers/userStateAPI');

/* GET home page */
 
const home=function(req,res,next){
  if (req.isAuthenticated()){
      render.renderStyle(req,res);
  }else{
    res.render('index1',{title:'GiraBahiense',logged:false})
  }
}

const readme=function(req,res,next){
  res.render('readme');
}

module.exports={home,readme};
