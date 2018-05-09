const mongoose = require('mongoose');


const userSchema=new mongoose.Schema({
  user:String,
  localSeleccionado:{
    type:String,
    default:"Nada"},
  estiloActual:{
    type:Number,
    default:1}
});

mongoose.model("user",userSchema);
