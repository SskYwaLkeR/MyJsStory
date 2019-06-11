const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user',()=>{
  console.log('listening on port 3000');
});

let storySchema = mongoose.Schema({
    Username: String,
    Description: {type: String, default: 'hii.. welcome'},
    YoutubeChannel: String,
    Blogs: String,
    Books: String,
    Mentors: String,
    Courses: String,
    Conclusion: String
});

module.exports = mongoose.model('storie', storySchema);

