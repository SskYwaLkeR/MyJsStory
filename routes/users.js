const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/user',()=>{
  console.log('listening on port 3000');
});

let userSchema = {
  name: String,
  email: String,
  password: String,
  username: String,
  messages: Array
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user',userSchema);