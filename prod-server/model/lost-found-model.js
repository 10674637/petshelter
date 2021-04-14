import mongoose from 'mongoose';
var lostFoundSchema = new mongoose.Schema({
  desc: String,
  type: Number,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});
lostFoundSchema.set('timestamps', true);
export default mongoose.model('lostFound', lostFoundSchema);