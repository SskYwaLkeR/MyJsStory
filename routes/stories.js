const mongoose = require('mongoose');

let storySchema = mongoose.Schema({
    username: String,
    Description: String,
    YoutubeChannel: String,
    Blogs: String,
    Books: String,
    Mentors: String,
    Courses: String,
    Conclusion: String
});

module.exports = mongoose.model('storie', storySchema);

