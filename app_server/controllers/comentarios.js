const mongoose = require('mongoose');
const comentario = mongoose.model('Comentarios');


const save=function(req,res){
  console.log(req.user);
  var objComentario={"usuario":req.user.id,"comment":req.body.comment,"value":req.body.value,"local":req.body.local,"nombre":req.user.displayName};
  var nuevo=new comentario(objComentario);
  nuevo.save()
    .then(item => {
   res.send("item saved to database");
   })
   .catch(err => {
   res.status(400).send("unable to save to database");
   });
}

const get=function(req,res){
  console.log(req.params);
  comentario.find({local:req.params.name}).exec((err, comments)=>{
    if (err) { 
      res.render('error', {
        error : err
      });    
    } else {
      res.send(comments);
    }
  });
}

module.exports = {
  save,get
}; 
