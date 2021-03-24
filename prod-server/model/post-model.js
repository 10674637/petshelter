import mongoose from 'mongoose';
var taskSchema = new mongoose.Schema({
  title: String,
  body: String,
  dueDate: {
    type: Date,
    default: Date.now
  },
  complete: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});
taskSchema.set('timestamps', true);
export default mongoose.model('task', taskSchema);