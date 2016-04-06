import mongoose from 'mongoose';

var orderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  writtendate: {
    type: String,
    required: true
  },
  consumer: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  drug: {
    type: String,
    required: true
  },
  alternate: {
    type: String,
    required: true
  },
  dose: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  prn: {
    type: String,
    required: true
  },
  refills: {
    type: Integer,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  noted: {
    type: Object,
    required: true
  }
  
});

export default mongoose.model('Order', orderSchema);
