import mongoose from 'mongoose';
import { StringUtil } from '../Utilities/string-util.js';
import bcrypt from 'bcrypt';
var userSchema = new mongoose.Schema({
  username: String,
  first: String,
  last: String,
  password: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  var first = StringUtil.capitalize(this.first.toLowerCase());
  var last = StringUtil.capitalize(this.last.toLowerCase());
  return "".concat(first, " ").concat(last);
});

userSchema.statics.passwordMatches = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  var unsafePassword = this.password;
  this.password = bcrypt.hashSync(unsafePassword, 10);
  next();
});
export default mongoose.model('user', userSchema);