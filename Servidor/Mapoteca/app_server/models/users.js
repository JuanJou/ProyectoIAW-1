const mongoose = require('mongoose');


const userSchema=new mongoose.Schema({
  user:String,
  localSeleccionado:String,
  estiloActual:Number,
});

mongoose.model("User",userSchema);
