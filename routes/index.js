const express = require('express');
const router = express.Router();
const userModel = require('./users');
const storyModel = require('./stories');
const passport = require('passport');
const passportLocal = require('passport-local');

//idk why i write this line everytime for passport 😂😂
passport.use(new passportLocal(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//post route for registering user

router.post('/register',(req, res)=>{

  let userDetails = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email
  }
  userModel.register(userDetails, req.body.password)
    .then(function(u){
      

      res.redirect('/stories');
      console.log('its working is working....');

      
    })
    .catch(function(e){
      res.send(e);
    })

});


//GET stories

router.get('/stories',isLoggedIn,(req, res)=>{
  storyModel.find({},(err,stories)=>{
    if(err){
      res.send(err);
    }
    else if(stories){
      res.render('stories',{stories: stories});
      
    }
  })
});


//post write own story

router.post('/story',(req,res)=>{
  let storyDetails = {
    Description: req.body.description,
    Username: req.session.passport.user,
    YoutubeChannel: req.body.youtubechannel,
    Blogs: req.body.blogs,
    Books: req.body.books,
    Mentors: req.body.mentors,
    Courses: req.body.courses,
    Conclusion: req.body.conclusion

  };

  let userStory = new storyModel(storyDetails);
  userStory.save()
    .then(function(storyy){
      res.redirect('/stories');
      console.log(storyDetails.Username);
      console.log(storyy);
    })

});

//get story form

router.get('/story',(req, res)=>{
  res.render('storyForm')
});

//get login page;
router.get('/login',(req,res)=>{
  res.render('login');
});

//get register page
router.get('/signup',(req,res)=>{
  res.render('Register');
})


//post login

router.post('/login', passport.authenticate('local', {
  successRedirect: '/stories',
  failureRedirect: '/'
}), function(req,res,next){});



//verify user

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
};

//logout route

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});


module.exports = router;
