const mongoose = require('mongoose');


const commentSchema=new mongoose.Schema({
  usuario:{
    type:String,
    required:true},
  comment:String,
  value:Number,
  local:{
    type:String,
    required:true},
  imagen:String,
  nombre:String
});

mongoose.model('Comentarios',commentSchema);
