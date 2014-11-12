var router = require('express').Router();
var Video = require('../models/video');

router.get('/', _isAdminLoggedIn, function(req, res, next){
  res.render('admin/index');
});

router.route('/uploadVideo')
  .get(_isAdminLoggedIn, function(req, res){
    res.render('admin/uploadVideo', {video: {}});
  })
  .post(_isAdminLoggedIn, function(req, res, next){
  	var title = req.body.title;
    var length = req.body.length;
  	var video = new Video({
  	  title: title,
      length: length,
      date: new Date().toISOString(),
      author: 'Sergey Kozachenko'
  	});
  	video.save(function(err){
      if (err){
        next(err);
      } else{
      	res.redirect('/admin');
      }
  	});
  });

function _isAdminLoggedIn(req, res, next){
  if (req.user /*&& req.user.role == 'su'*/){
    next();
  } else {
    res.redirect('/auth/login');
  }
};

module.exports = router;