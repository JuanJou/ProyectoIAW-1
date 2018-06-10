const mongoose = require('mongoose');
const User = mongoose.model('ourUsers');

const getUserState=function(req,res){
  User.find({user:req.user.id}).exec((err, usuario)=>{
    if (err) { 
      res.render('error',{
        error:err
      });    
    } else {
      if (!usuario.length){
        usuario=new User({"user":req.user.id});
        usuario.save();
        res.send([usuario]);
        return;
      }
      res.send(usuario);
    }
  });
}




const setUserStateStyle=function(req,res){
  User.update({user:req.user.id},{estiloActual:req.body.style},	{upsert: true, setDefaultsOnInsert: true},(err, usuario) => {
    if (err) { 
      res
        .status(400)
        .json(err);    
     } else {
      res
        .status(201)
        .json(usuario);
    }
  });
}

const setUserStateLocal=function(req,res){
  User.update({user:req.user.id},{localSeleccionado:req.body.local},	{upsert: true, setDefaultsOnInsert: true},(err, usuario) => {
    if (err) { 
      res
        .status(400)
        .json(err);    
        	} else {
      res
        .status(201)
        .json(usuario);
    }
  });
}

const renderStyle=function(req,res){
  User.find({user:req.user.id}).exec((err, usuario)=>{
    if (err) { 
      res.render('error',{
        error:err
      });    
    } else {
      if (!usuario.length){
        res.render('index1',{title:'GiraBahiense',logged:true});
      }
      else{
          res.render('index'+usuario[0].estiloActual,{title:'GiraBahiense',logged:true});
      }
    }
  });
}

module.exports={getUserState,setUserStateStyle,setUserStateLocal,renderStyle};
