var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 發表文章
router.get('/post', function(req, res, next) {
  res.render('post', { title: '發表故事' });
});
router.post('/post', function(req, res, next) {
  
});

// 查看所有文章
router.get('/story', function(req, res, next) {
  res.render('story', { title: '故事集' });
});
router.post('/story', function(req, res, next) {
  
});

module.exports = router;
