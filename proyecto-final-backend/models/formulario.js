const mongoose = require('mongoose');
const {Schema} = mongoose;

const Rol = require ('./rol'); 
const Persona = require ('./persona'); 

const FormularioSchema = new Schema({
 tipo: {type:String, required:true},
 descripcion: {type:String, required:true},
 archivo: [{
  base64:{type:String},
  type:{type: String},
  name:{type: String}
  }],
 //mostrarPara: [{type: mongoose.Types.ObjectId, ref: 'Rol', required:true}],
 rol:{type: String},
 creadoPor: {type: mongoose.Types.ObjectId, ref: 'Persona', required:true}
})

module.exports = mongoose.models.Formulario || mongoose.model('Formulario', FormularioSchema);