var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
User = require('../models/user.js'),
Story = require('../models/story.js');

/*
//the middleware that will be executed before each requests
router.use(function(req, res, next){
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log(ip);
  //continue the process
  next();
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BBS'});
});

// 發表文章
router.get('/post', function(req, res, next) {
  res.render('post', { title: '發表故事' });
});
router.post('/post', function(req, res, next) {
  //get user's ip address
  var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //declare the sha256 value of ip
  var sha256 = crypto.createHash('sha256'),
      ip = sha256.update(ipAddress).digest('hex');
  var newUser = new User({
    ip: ip
  });
  //story info
  var index = new Date().getTime(), //temporary
      timestamp = new Date().getTime(),
      content = req.body.content;
  var newStory = new Story({
    index: index,
    timestamp: timestamp,
    content: content
  });
  //check if user ip exists
  //User.get(newUser.ip, function(err, user){
  //  if(user){
  //    req.flash('error', );
  //    return res.redirect('/post');
  //  }
  //})

});

// 查看所有文章
router.get('/story', function(req, res, next) {
  res.render('story', { title: '故事集' });
});
router.post('/story', function(req, res, next) {
  
});

// 註冊
router.get('/register', function(req, res, next) {
  res.render('register', { title: '註冊' });
});
router.post('/register', function(req, res, next) {
  
});

// 登入
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登入' });
});
router.post('/login', function(req, res, next) {
  
});

// 登出
router.get('/logout', function(req, res, next) {
  
});

module.exports = router;
