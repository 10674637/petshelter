var _mongoose$Schema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import mongoose from 'mongoose';
var lostFoundSchema = new mongoose.Schema((_mongoose$Schema = {
  desc: String,
  type: Number,
  image: String,
  petType: String,
  personName: String,
  location: String,
  contact: String
}, _defineProperty(_mongoose$Schema, "type", Number), _defineProperty(_mongoose$Schema, "author", {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
}), _mongoose$Schema));
lostFoundSchema.set('timestamps', true);
export default mongoose.model('lostFound', lostFoundSchema);