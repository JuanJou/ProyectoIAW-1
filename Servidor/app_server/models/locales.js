const mongoose = require('mongoose');

const hora=new mongoose.Schema({
  hora:{
    type:Number,
    required:true,
    min:0,
    max:23
  },
  minutos:{
    type:Number,
    default:0,
    min:0,
    max:59
  }
});

const horarioSchema=new mongoose.Schema({
  dia:String,
  horarioApertura:hora,
  horarioCierra:hora,
});

const localSchema=new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  ubicacion: {
    type:[Number],
    index:'2dsphere'
  },
  direccion:String,
  valoracion:{
    type:Number,
    'default':0,
    min:0,
    max:5
  },
  horario:[horarioSchema],
  
});
