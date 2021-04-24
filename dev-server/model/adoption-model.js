import mongoose from 'mongoose';

var adoptionSchema = new mongoose.Schema({
  desc: String,
  fee: String,
  image: String,
  petType: String,
  location:String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});
adoptionSchema.set('timestamps', true);

export default mongoose.model('adoption', adoptionSchema);