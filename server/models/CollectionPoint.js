const mongoose =require('mongoose');
const cpSchema = new mongoose.Schema({
  name: { type:String, required:true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  locationName: { type:String, required:true },
  location: { type:{type:String,enum:['Point'],default:'Point'}, coordinates:{type:[Number], required:true} }
}, { timestamps:true });

cpSchema.index({ location:'2dsphere' });

module.exports= mongoose.model('CollectionPoint', cpSchema);