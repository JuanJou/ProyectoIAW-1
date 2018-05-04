const mongoose = require('mongoose');


const commentSchema=new mongoose.Schema({
  usuario:{
    type:mongoose.Schema.Types.ObjectID,
    required:true},
  comment:String,
  value:Number,
  local:{
    type:String,
    required:true}
});

mongoose.model('Comentarios',commentSchema);
