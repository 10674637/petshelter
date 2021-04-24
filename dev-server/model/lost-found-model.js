import mongoose from 'mongoose';
var lostFoundSchema = new mongoose.Schema({
  desc: String,
  type: Number,
  image: String,
  petType: String,
  personName: String,
  location:String,
  contact: String,
  type:Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
});
lostFoundSchema.set('timestamps', true);
export default mongoose.model('lostFound', lostFoundSchema);