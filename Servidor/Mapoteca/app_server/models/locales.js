const mongoose = require('mongoose');


const horarioSchema=new mongoose.Schema({
  dia:String,
  horarioApertura:String,
  horarioCierra:String,
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
  telefono:Number,
  capacidad:Number,
  facebook:String
});

mongoose.model('local2',localSchema);
mongoose.model('horario',horarioSchema);
