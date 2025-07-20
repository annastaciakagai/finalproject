const mongoose =require('mongoose');
const eventSchema = new mongoose.Schema({
  produce: { type: mongoose.Schema.Types.ObjectId, ref:'Produce', required:true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  collectionPoint: { type: mongoose.Schema.Types.ObjectId, ref:'CollectionPoint', required:true },
  routeDetails: { type: mongoose.Schema.Types.ObjectId, ref:'Route', default:null },
  status: { type:String, enum:['scheduled', 'collected','enRoute','delivered', 'sold'], default:'collected' },
  collectedAt: { type:Date, default:Date.now },
  deliveredAt: {type:Date, default:Date.now },
  notes: { type: mongoose.Schema.Types.ObjectId, ref:'Produce'}
}, { timestamps:true });
module.exports = mongoose.model('CollectionEvent', eventSchema);